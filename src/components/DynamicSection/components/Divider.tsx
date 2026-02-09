import { Divider as AntDivider } from 'antd';
import { DividerConfig } from '../../../types';

interface DividerProps {
    config: DividerConfig;
}

const Divider = ({ config }: DividerProps) => {
    return (
        <AntDivider
            style={{
                borderColor: config.color || 'var(--color-bg-tertiary)',
                borderWidth: config.thickness || 1,
                borderStyle: config.style || 'solid',
            }}
        />
    );
};

export default Divider;
