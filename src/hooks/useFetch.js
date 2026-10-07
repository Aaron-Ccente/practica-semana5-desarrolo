import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(fetcher) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await fetcher(controller.signal);
        setState({ data, loading: false, error: null });
      } catch (err) {
        if (axios.isCancel(err)) return;
        setState({ data: null, loading: false, error: err.message });
      }
    };

    load();
    return () => controller.abort();
  }, [fetcher]);

  return state;
}
