import '../styles.css';

interface Props {
  description: string;
  icon: string;
}

const Tooltip: React.FC<Props> = ({ description, icon }) => {
  return (
    <span className="tooltip">
      {icon}
      <span className="tooltiptext">{description}</span>
    </span>
  );
};

export default Tooltip;
