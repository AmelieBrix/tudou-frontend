import { Spin } from 'antd';
import './Spinner.css'; 

const Spinner = ({ size = 'default' }) => {
  return (
    <div className="spinner-container">
      <Spin size={size} />
    </div>
  );
};

export default Spinner;
