import { useState } from "react";

const App = () => {
  //states
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((prevState) => [...prevState, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevState) =>
      prevState.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function handleToggleItem(id) {
    setItems((prevState) => {
      return prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              packed: !item.packed,
            }
          : item
      );
    });
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
};

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  //states
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //functions
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onRemoveItems, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleRemoveItem={onRemoveItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleRemoveItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <div className="stats">
        <em>Start adding some items to your packing list 🚀!</em>
      </div>
    );
  }

  //computed variables
  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentPackedItems = Math.round((numPackedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentPackedItems === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} item(s) in your list, and you already packed ${numPackedItems} (${percentPackedItems}%).`}
      </em>
    </footer>
  );
}

export default App;
