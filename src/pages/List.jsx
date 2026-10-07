import useFetch from "../hooks/useFetch";
import { getUsers } from "../services/api";

export default function List() {
  const { data, loading, error } = useFetch(getUsers);

  if (loading) return <p>Cargando usuarios…</p>;
  if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;

  return (
    <>
      <h1>Usuarios ({data.length})</h1>
      {data.length === 0 && <p>No hay datos.</p>}
      <ul>
        {data.map((u) => (
          <li key={u.id}>
            {u.name} — <small>{u.email}</small>
          </li>
        ))}
      </ul>
    </>
  );
}
