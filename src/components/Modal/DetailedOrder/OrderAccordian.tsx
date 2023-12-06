import { useContext, useState } from 'react';
import { FaRegCircle, FaRegCircleCheck, FaRegCirclePlay } from 'react-icons/fa6';
import userContext from '../../../context/userContext.ts';
import { Role, Status } from '../../../enums.ts';
import ChangeOrderStatusButton from '../../Buttons/ChangeOrderStatusButton.tsx';
import { completeSubtaskInstance, initiateTaskInstance } from '../../../services/apiService.ts';
import classes from './OrderAccordian.module.css'

interface AccordionProps {
	order: ICurrentOrder;
	setOrder: (newvalue: ICurrentOrder) => void;
}

function Accordion({ order, setOrder }: AccordionProps) {
	const [openTaskId, setOpenTaskId] = useState<number | null>(null);

	const user = useContext(userContext);

	const toggleTask = (taskId: number) => {
		setOpenTaskId(openTaskId === taskId ? null : taskId);
	};

	async function handleStartTask(taskId: number) {
		const response = await initiateTaskInstance(taskId, (user as IEmployee).id);
		console.log(response);
		setOrder(response);
	}

	async function handleCompleteSubtask(subtaskId: number) {
		const response = await completeSubtaskInstance(subtaskId);
		console.log(response);
		setOrder(response);
	}

	return (
		<>
			{order.tasks && (
				<div>
					{order.tasks?.map((task) => (
						<div key={task.id}>
							<button className={classes.accordianLabel} onClick={() => toggleTask(task.id)}>
								{task.status === Status.IN_PROGRESS && <FaRegCirclePlay color='yellow' />}
								{task.status === Status.COMPLETED && <FaRegCircleCheck color='green' />}
								{task.name} ({task.subtasks.filter((subtask) => subtask.status === Status.COMPLETED).length}/
								{task.subtasks.length})
							</button>

							{(user as IEmployee | ICustomer)?.role === Role.EMPLOYEE &&
							task.status === Status.PENDING &&
							(order.status === Status.PENDING || order.status === Status.IN_PROGRESS) ? (
								<ChangeOrderStatusButton btnText='Start opgave' onClick={() => handleStartTask(task.id)} />
							) : null}

							{openTaskId === task.id && (
								<div className={classes.accordianContent}>
									{task.subtasks.map((subtask) => (
										<div className={classes.contentItem} key={subtask.id}>
											<div>
												{subtask.status === Status.PENDING && <FaRegCircle />}
												{subtask.status === Status.COMPLETED && <FaRegCircleCheck color='green' />}
												{subtask.status === Status.IN_PROGRESS && <FaRegCirclePlay color='yellow' />}
											</div>
											{subtask.name} - {subtask.description}
											{subtask.status === Status.IN_PROGRESS &&
											(user as IEmployee | ICustomer)?.role === Role.EMPLOYEE ? (
												<ChangeOrderStatusButton
													btnText='Færdig'
													onClick={() => handleCompleteSubtask(subtask.id)}
												/>
											) : null}
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default Accordion;