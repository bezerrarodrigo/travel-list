import { useState } from "react";
import { Logo } from "../src/components/Logo";
import { Form } from "./components/Form";
import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";

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

  function handleClearList(params) {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );

    if (confirmed) {
      setItems([]);
    } else {
      return;
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
