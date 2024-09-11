import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};

export const usePreviousReference = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export const customHeight = (height) => {
    return height;
};

export const Toast = () => {
    return toast;
};