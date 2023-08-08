export function Stats({ items }) {
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
