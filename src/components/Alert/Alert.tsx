import { X } from "lucide-react";
import "./index.scss";
import { ReactNode } from "react";
interface Iprops {
  type: string;
  icon: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
}
const Alert = ({ type, icon, description, title, children }: Iprops) => {
  return (
    <div className={type}>
      <div className="alert-header">
        <div className="title">
          {icon}
          <h4>{title}</h4>
        </div>
        <span>
          <X />
        </span>
      </div>
      <div className="text">{children ? children : <p>{description}</p>}</div>
    </div>
  );
};

export default Alert;
