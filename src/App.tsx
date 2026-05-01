import { useState } from "react";

type User = {
  id: number;
  name: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Aruzhan" },
    { id: 2, name: "Dias" },
    { id: 3, name: "Alina" },
  ]);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

 return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.title}>Users List</h2>

      {users.length === 0 ? (
        <p style={styles.empty}>No users</p>
      ) : (
        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user.id} style={styles.item}>
              <span>{user.name}</span>
              <button
                style={styles.button}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "300px",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  button: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center" as const,
    color: "#888",
  },
};
export default App;