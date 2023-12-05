import PageLayout from './PageLayout.tsx';
import '../components/TaskCheckbox/CreateOrder.css';
import CreateOrderForm from '../components/CreateOrderForm/CreateOrderForm.tsx';

export default function CreateOrder({ customer }: { customer: ICustomer }) {

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret Ordre</h1>
			<CreateOrderForm customer={customer} />
		</PageLayout>
	);
}


/*

 interface Props {
 customer: ICustomer;
 }

 interface newOrder {
 orderStartDate: string,
 carId: number,
 customerId: string,
 tasks: { id: number }[]
 }

 type TDatePiece = Date | null;
 type TDate = TDatePiece | [TDatePiece, TDatePiece]

 async function createOrder(newOrder: newOrder) {
 return await fetch(`http://localhost:3000/orders`, {
 method: 'POST',
 body: JSON.stringify(newOrder),
 headers: {
 'Content-Type': 'application/json',
 },
 });
 }

 */

/*
 const [tasks, setTasks] = useState<null | IAPITask[]>(null);
 const [cars, setCars] = useState<null | ICar[]>(null);
 const [bookedDates, setBookedDates] = useState<string[]>([]);
 const [selectedCarId, setSelectedCarId] = useState('');
 const [selectedTasks, setSelectedTasks] = useState<{ id: number }[] | []>([]);
 const [selectedDate, setSelectedDate] = useState<null | TDate>(null);
 const navigate = useNavigate();

 console.log(selectedDate);

 useEffect(() => {
 async function getTasksAndCars() {

 try {
 const promiseTasks = await fetch('http://localhost:3000/tasks');
 const promiseCars = await fetch(`http://localhost:3000/customers/${customer.id}/cars`);
 const promiseBookedDates = await fetch('http://localhost:3000/orders/dates');

 if (promiseTasks.ok) {
 setTasks(await promiseTasks.json());
 } else {
 console.log('Promise is nok ok');
 console.log(promiseTasks.body);
 }

 if (promiseCars.ok) {
 setCars(await promiseCars.json());
 } else {
 console.log('Promise is nok ok');
 console.log(promiseCars.body);
 }

 if (promiseBookedDates.ok) {
 setBookedDates(await promiseBookedDates.json());
 } else {
 console.log('Promise is nok ok');
 console.log(promiseBookedDates.body);
 }

 } catch (error: unknown) {
 console.log('ERROR at fetch');
 console.log((error as Error).message);
 }
 }

 getTasksAndCars();
 }, [customer.id]);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();

 const form = e.target as HTMLFormElement;

 // Get all checked checkboxes
 const checkedCheckboxes = form.querySelectorAll('input[type="checkbox"]:checked');

 // Extract task IDs from checked checkboxes
 const taskObjects = Array.from(checkedCheckboxes).map((checkbox) => {
 return {
 id: parseInt(checkbox.id),
 };
 });

 //Create a new ISO date. Split at T and return index 0, which is YYYY-MM-DD
 //It returns an incorrect DD (-1).We split on the dashes "-". To split the values in 3 variables.
 //Lastly, We assemble the values together, where the day is now correct
 const [year, month, day] = new Date(selectedDate?.toString() as string).toISOString().split('T')[0].split('-');
 const correctDate = `${year}-${month}-${parseInt(day) + 1}`;


 const newOrder: newOrder = {
 customerId: customer.id,
 carId: parseInt(selectedCarId),
 orderStartDate: correctDate,
 tasks: taskObjects,
 };
 console.log(newOrder.orderStartDate);

 try {
 const promise = await createOrder(newOrder);

 if (promise.ok) {
 navigate('/profile');
 } else {
 console.log('FETCH CREATE ERROR');
 console.log(promise.body);
 }
 } catch (error: unknown) {
 console.log((error as Error).message);
 }

 };

 function disableTiles({ date }: { date: Date }): boolean {
 return bookedDates.some((bookedDate) => date.toISOString().split('T')[0] === bookedDate);
 }


 */

/*


 <PageLayout>
 <h1>Opret Ordre</h1>
 {tasks ? (
 <>
 <form onSubmit={handleSubmit}>
 <div className='form-container'>
 <section className='create-order-container'>
 {tasks.map((task) => (
 <TaskCheckbox
 key={task.id}
 task={task}
 setSelectedTasks={setSelectedTasks}
 selectedTasks={selectedTasks}
 />
 ))}
 </section>

 <section>
 <select name='cars' id='cars' onChange={(e) => setSelectedCarId(e.target.value)}>
 <option value=''>Ej køretøj valgt</option>
 {cars &&
 cars.map((car) => (
 <option value={String(car.id)} key={car.id}>
 {car.brand} : Reg. nr. {car.registrationNumber}
 </option>
 ))}
 </select>
 </section>

 <section>
 <Calendar
 className='calender'
 value={selectedDate}
 onChange={(value) => setSelectedDate(value)}
 tileDisabled={disableTiles}
 nextLabel='>'
 prevLabel='<'
 minDetail='year'
 minDate={new Date()}
 />
 </section>
 <input type='submit' value='Submit' disabled={!selectedCarId || !selectedTasks.length || !selectedDate}></input>
 {!selectedDate && <p>Date is missing</p>}
 {!selectedTasks.length && <p>Tasks are missing</p>}
 {!selectedCarId && <p>Car is missing</p>}
 </div>
 </form>
 </>
 ) : (
 <Loader />
 )}
 </PageLayout>
 */