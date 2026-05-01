import { useState } from "react";

type User = {
  id: number;
  name: string;
};

function App() {
  // ===== ЗАДАЧА 1 =====
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Aruzhan" },
    { id: 2, name: "Dias" },
    { id: 3, name: "Alina" },
  ]);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // ===== ЗАДАЧА 2 =====
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  // ===== ЗАДАЧА 3 =====
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Must include uppercase letter";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Must include special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Login success");
    }
  };

  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  return (
    <div style={styles.container}>
      <h1>Практические задачи</h1>

      {/* ===== ЗАДАЧА 1 ===== */}
      <div style={styles.card}>
        <h2 style={styles.taskTitle}>
          Задача 1 — Список пользователей
        </h2>

        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user.id} style={styles.item}>
              {user.name}
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== ЗАДАЧА 2 ===== */}
      <div style={styles.card}>
        <h2 style={styles.taskTitle}>
          Задача 2 — Показать / скрыть блок
        </h2>

        <button style={styles.toggleBtn} onClick={handleToggle}>
          {isVisible ? "Hide" : "Show"}
        </button>

        {isVisible && (
          <div style={styles.box}>
            <p>This is a toggle block</p>
          </div>
        )}
      </div>

      {/* ===== ЗАДАЧА 3 ===== */}
      <div style={styles.card}>
        <h2 style={styles.taskTitle}>
          Задача 3 — Форма логина
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

        <div style={styles.passwordWrapper}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={styles.input}
  />

  <span
    style={styles.eye}
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? "🙈" : "👁"}
  </span>
</div>
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <div style={styles.progress}>
            <div
              style={{
                ...styles.progressBar,
                width: `${getStrength() * 33}%`,
              }}
            />
          </div>

          <button type="submit" style={styles.toggleBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "30px",
    padding: "40px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "320px",
  },

  taskTitle: {
    marginBottom: "12px",
    fontSize: "18px",
    fontWeight: "bold",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  deleteBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer",
  },

  toggleBtn: {
    marginTop: "10px",
    padding: "8px 16px",
    background: "#1677ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  box: {
    marginTop: "15px",
    padding: "15px",
    background: "#e6f4ff",
    borderRadius: "8px",
  },

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },

  // 🔥 ИДЕАЛЬНЫЙ input
  input: {
    padding: "8px 35px 8px 8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box" as const,
  },

  error: {
    color: "red",
    fontSize: "12px",
  },

  progress: {
    height: "6px",
    background: "#eee",
    borderRadius: "4px",
  },

  progressBar: {
    height: "100%",
    background: "#52c41a",
    borderRadius: "4px",
  },

  // 🔥 wrapper
  passwordWrapper: {
    position: "relative" as const,
    width: "100%",
  },

  // 🔥 глаз
  eye: {
    position: "absolute" as const,
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default App;