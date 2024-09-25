import 'server-only'

import {
	createAI,
	createStreamableUI,
	getMutableAIState,
	getAIState,
	streamUI,
	createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import {
	spinner,
	BotCard,
	BotMessage,
	SystemMessage,
	Stock,
	Purchase
} from '@/components/stocks'

import { z } from 'zod'
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
import { Stocks } from '@/components/stocks/stocks'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
	formatNumber,
	runAsyncFnWithoutBlocking,
	sleep,
	nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat, Message } from '@/lib/types'
import { getServerUser } from '@/lib/supabase/server'
import { activityTypes } from '../validators/exercise-validator'

async function confirmPurchase(symbol: string, price: number, amount: number) {
	'use server'

	const aiState = getMutableAIState<typeof AI>()

	const purchasing = createStreamableUI(
		<div className="inline-flex items-start gap-1 md:items-center">
			{spinner}
			<p className="mb-2">
				Purchasing {amount} ${symbol}...
			</p>
		</div>
	)

	const systemMessage = createStreamableUI(null)

	runAsyncFnWithoutBlocking(async () => {
		await sleep(1000)

		purchasing.update(
			<div className="inline-flex items-start gap-1 md:items-center">
				{spinner}
				<p className="mb-2">
					Purchasing {amount} ${symbol}... working on it...
				</p>
			</div>
		)

		await sleep(1000)

		purchasing.done(
			<div>
				<p className="mb-2">
					You have successfully purchased {amount} ${symbol}. Total cost:{' '}
					{formatNumber(amount * price)}
				</p>
			</div>
		)

		systemMessage.done(
			<SystemMessage>
				You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
				{formatNumber(amount * price)}.
			</SystemMessage>
		)

		aiState.done({
			...aiState.get(),
			messages: [
				...aiState.get().messages,
				{
					id: nanoid(),
					role: 'system',
					content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
						amount * price
					}]`
				}
			]
		})
	})

	return {
		purchasingUI: purchasing.value,
		newMessage: {
			id: nanoid(),
			display: systemMessage.value
		}
	}
}

async function submitUserMessage(content: string) {
	'use server'

	const aiState = getMutableAIState<typeof AI>()

	aiState.update({
		...aiState.get(),
		messages: [
			...aiState.get().messages,
			{
				id: nanoid(),
				role: 'user',
				content
			}
		]
	})

	let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
	let textNode: undefined | React.ReactNode

	const result = await streamUI({
		model: openai('gpt-3.5-turbo'),
		initial: <SpinnerMessage />,
		system: `\
    You are an exercise tracker bot and you can help users record exercise sessions and record the specific
    details of exercise activities that make up an exercise session.
    You and the user can discuss exercises, exercise session goals and more to enhance the fitness, strength 
    and overal health of the user.
    
    If you want to show the user their full list of exercises call \`list_exercises\`.
    If you want to add a new exercise option to their list of exercises, call \`add_new_exercise\` to add the exercise.
    If you want to record a new exercise session, call \`record_exercise_sessions\` to create a new session for them to add exercise sets to.
    If you want to add one or more exercise sets to an exercise session, call \`add_exercise_set\`.
    If the user wants to do something completely unrelated to health or fitness or complete another impossible task, respond that you are unable to do that.
    
    Besides that, you can also chat with users and provide suggestions.`,
		messages: [
			...aiState.get().messages.map((message: any) => ({
				role: message.role,
				content: message.content,
				name: message.name
			}))
		],
		text: ({ content, done, delta }) => {
			if (!textStream) {
				textStream = createStreamableValue('')
				textNode = <BotMessage content={textStream.value} />
			}

			if (done) {
				textStream.done()
				aiState.done({
					...aiState.get(),
					messages: [
						...aiState.get().messages,
						{
							id: nanoid(),
							role: 'assistant',
							content
						}
					]
				})
			} else {
				textStream.update(delta)
			}

			return textNode
		},
		tools: {
			listExercises: {
				description: 'List the exercises that a user has added',
				parameters: z.object({
					message: z
						.string()
						.describe(
							'A friendly message to let them know you are finding their exercises'
						)
				}),

				generate: async function* ({ message }) {
					yield (
						<BotCard>
							<StocksSkeleton />
						</BotCard>
					)

					await sleep(1000)

					const toolCallId = nanoid()

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: 'assistant',
								content: [
									{
										type: 'tool-call',
										toolName: 'listExercises',
										toolCallId,
										args: { message }
									}
								]
							},
							{
								id: nanoid(),
								role: 'tool',
								content: [
									{
										type: 'tool-result',
										toolName: 'listStocks',
										toolCallId,
										result: message
									}
								]
							}
						]
					})

					return (
						<BotCard>
							<p>{message}</p>
						</BotCard>
					)
				}
			},
			addNewExercise: {
				description:
					'Add a new exercise for the user. If they have not provided a description, generate a concise description based on the name of the exercise.',
				parameters: z.object({
					title: z
						.string()
						.describe('The title of the exercise provided by the user'),
					description: z
						.number()
						.describe(
							'Based on the title of the exercise, generate simple description of this exercise activity'
						),
					activityType: z
						.enum(activityTypes)
						.describe('The appropriate category for the type of exercise')
				}),
				generate: async function* ({ title, description, activityType }) {
					yield (
						<BotCard>
							<StockSkeleton />
						</BotCard>
					)

					await sleep(1000)

					const toolCallId = nanoid()

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: 'assistant',
								content: [
									{
										type: 'tool-call',
										toolName: 'addNewExercise',
										toolCallId,
										args: { title, description, activityType }
									}
								]
							},
							{
								id: nanoid(),
								role: 'tool',
								content: [
									{
										type: 'tool-result',
										toolName: 'addNewExercise',
										toolCallId,
										result: { title, description, activityType }
									}
								]
							}
						]
					})

					return (
						<BotCard>
							{JSON.stringify({ title, description, activityType })}
						</BotCard>
					)
				}
			},
			recordExerciseSession: {
				description:
					'Respond to a request to record a user session by showing the user a form.',
				parameters: z.object({
					message: z
						.string()
						.describe(
							'A friendly message to let the user know you are assisting them.'
						)
				}),
				generate: async function* ({ message }) {
					const toolCallId = nanoid()

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: 'assistant',
								content: [
									{
										type: 'tool-call',
										toolName: 'recordExerciseSession',
										toolCallId,
										args: { message }
									}
								]
							},
							{
								id: nanoid(),
								role: 'tool',
								content: [
									{
										type: 'tool-result',
										toolName: 'recordExerciseSession',
										toolCallId,
										result: {
											message
										}
									}
								]
							}
						]
					})

					return <BotCard>{JSON.stringify(message)}</BotCard>
				}
			},
			addExerciseSet: {
				description:
					'Enable a user to record one or more exercise sets of any kind of activity as part of their exercise session.',
				parameters: z.object({
					sets: z.array(
						z.object({
							exerciseTitle: z
								.string()
								.describe('The name of the exercise activity'),
							reps: z.coerce
								.number()
								.optional()
								.describe('The amount of reps for this exercise set'),
							weight: z
								.string()
								.optional()
								.describe('The amount of weight involved in this exercise set'),
							distance: z
								.string()
								.optional()
								.describe(
									'The amount of distance travelled as part of this set'
								)
						})
					)
				}),
				generate: async function* ({ sets }) {
					yield (
						<BotCard>
							<EventsSkeleton />
						</BotCard>
					)

					await sleep(1000)

					const toolCallId = nanoid()

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: 'assistant',
								content: [
									{
										type: 'tool-call',
										toolName: 'addExerciseSet',
										toolCallId,
										args: { sets }
									}
								]
							},
							{
								id: nanoid(),
								role: 'tool',
								content: [
									{
										type: 'tool-result',
										toolName: 'addExerciseSet',
										toolCallId,
										result: sets
									}
								]
							}
						]
					})

					return <BotCard>{JSON.stringify(sets)}</BotCard>
				}
			}
		}
	})

	return {
		id: nanoid(),
		display: result.value
	}
}

export type AIState = {
	chatId: string
	messages: Message[]
}

export type UIState = {
	id: string
	display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
	actions: {
		submitUserMessage,
		confirmPurchase
	},
	initialUIState: [],
	initialAIState: { chatId: nanoid(), messages: [] },
	onGetUIState: async () => {
		'use server'

		const session = await getServerUser()

		if (session && session?.data?.user) {
			const aiState = getAIState()

			if (aiState) {
				// @ts-ignore
				const uiState = getUIStateFromAIState(aiState)
				return uiState
			}
		} else {
			return
		}
	},
	onSetAIState: async ({ state }) => {
		'use server'
		const session = await getServerUser()

		if (session && session?.data?.user) {
			const { chatId, messages } = state

			const createdAt = new Date()
			const userId = session.data.user.id as string
			const path = `/chat/${chatId}`

			const firstMessageContent = messages[0].content as string
			const title = firstMessageContent.substring(0, 100)

			const chat: Chat = {
				id: chatId,
				title,
				userId,
				createdAt,
				messages,
				path
			}

			await saveChat(chat)
		} else {
			return
		}
	}
})

export const getUIStateFromAIState = (aiState: Chat) => {
	return aiState.messages
		.filter(message => message.role !== 'system')
		.map((message, index) => ({
			id: `${aiState.chatId}-${index}`,
			display:
				message.role === 'tool' ? (
					message.content.map(tool => {
						return tool.toolName === 'listExercises' ? (
							<BotCard>
								{/* TODO: Infer types based on the tool result*/}
								<div>{JSON.stringify(tool.result)}</div>
							</BotCard>
						) : tool.toolName === 'addNewExercise' ? (
							<BotCard>
								<div>{JSON.stringify(tool.result)}</div>
							</BotCard>
						) : tool.toolName === 'recordExerciseSession' ? (
							<BotCard>
								{/* @ts-expect-error */}
								<Purchase props={tool.result} />
							</BotCard>
						) : tool.toolName === 'getEvents' ? (
							<BotCard>
								{/* @ts-expect-error */}
								<Events props={tool.result} />
							</BotCard>
						) : null
					})
				) : message.role === 'user' ? (
					<UserMessage>{message.content as string}</UserMessage>
				) : message.role === 'assistant' &&
				  typeof message.content === 'string' ? (
					<BotMessage content={message.content} />
				) : null
		}))
}
