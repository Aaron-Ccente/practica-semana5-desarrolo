import { useState } from "react";
import { createUser } from "../services/api";

const initial = { name: "", email: "" };

export default function Form() {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState({ sending: false, error: null });
  const [sent, setSent] = useState([]); // lista que MUTA

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const isValid = values.name.trim() && /\S+@\S+\.\S+/.test(values.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus({ sending: true, error: null });
    try {
      const created = await createUser(values);
      setSent((list) => [{ ...created, uid: crypto.randomUUID() }, ...list]);
      setValues(initial);
      setStatus({ sending: false, error: null });
    } catch (err) {
      setStatus({ sending: false, error: err.message });
    }
  };

  return (
    <>
      <h1>Nuevo usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={values.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <button disabled={!isValid || status.sending}>
          {status.sending ? "Enviando…" : "Guardar"}
        </button>
      </form>

      {status.error && <p style={{ color: "crimson" }}>{status.error}</p>}

      <ul>
        {sent.map((u) => (
          <li key={u.uid}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </>
  );
}
