export function Item({ item, handleRemoveItem, onToggleItem }) {
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
