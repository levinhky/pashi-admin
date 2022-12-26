import {useEffect, useState} from "react";

function useDebounce(value, timeout) {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounce(value), timeout);

        return () => clearTimeout(handler);
    }, [value]);

    return debounce;
}

export default useDebounce;