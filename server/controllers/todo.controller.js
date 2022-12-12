const Todo = require('../models/todo.model')

const [itemText, setItemText] = useState('');
const [listItems, setListItems] = useState([]);
const [isUpdating, setIsUpdating] = useState('');
const [updateItemText, setUpdateItemText] = useState('');

const addItem = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5500/api/item', { item: itemText })
        setListItems(prev => [...prev, res.data]);
        setItemText('');
    } catch (err) {
        console.log(err);
    }
}


useEffect(() => {
    const getItemsList = async () => {
        try {
            const res = await axios.get('http://localhost:5500/api/items')
            setListItems(res.data);
            console.log('render')
        } catch (err) {
            console.log(err);
        }
    }
    getItemsList()
}, []);

const deleteItem = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
        const newListItems = listItems.filter(item => item._id !== id);
        setListItems(newListItems, res.data);
    } catch (err) {
        console.log(err);
    }
}

const updateItem = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, { item: updateItemText })
        console.log(res.data)
        const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
        const updatedItem = listItems[updatedItemIndex].item = updateItemText;
        setUpdateItemText('');
        setIsUpdating('');
        console.log(updatedItem)
    } catch (err) {
        console.log(err);
    }
}
//input for update item
const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => { updateItem(e) }} >
        <input className="update-new-input" type="text" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
        <button className="update-new-btn" type="submit">Update</button>
    </form>
)

module.exports = { 
    addItem,
    getItemsList,
    deleteItem,
    updateItem,
    renderUpdateForm,

}