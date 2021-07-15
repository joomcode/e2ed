import { useContext } from './useContext';
const [getRawMeta, setRawMeta] = useContext();
export const getMeta = () => getRawMeta() || {};
export const setMeta = (partialMeta) => {
    const meta = getRawMeta();
    setRawMeta({ ...meta, ...partialMeta });
};
