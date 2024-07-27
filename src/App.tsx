import "./App.css";
import { AlertTriangle, Ban, Bell, CheckCheck, Info } from "lucide-react";
import Alert from "./components/Alert/Alert";
function App() {
  return (
    <>
      <Alert
        type={"alert-default"}
        icon={<Bell size={20} />}
        title={"Upgrade your plan"}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum id
          alias doloribus. <a href="/">Iusto</a>, quia. Similique recusandae error aspernatur
          iste iure?
        </p>
      </Alert>

      <Alert
        type={"alert-info"}
        icon={<Info size={20} />}
        title={"Note"}
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur temporibus doloremque praesentium
          laboriosam iste totam officiis beatae sint non quas."
      />
      <Alert
        type={"alert-success"}
        icon={<CheckCheck size={20} />}
        title={"Your order has been processed"}
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur temporibus doloremque praesentium
          laboriosam iste totam officiis beatae sint non quas."
      />
      <Alert
        type={"alert-error"}
        icon={<Ban size={20} />}
        title={"Something went wrong"}
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur temporibus doloremque praesentium
          laboriosam iste totam officiis beatae sint non quas."
      />
      <Alert
        type={"alert-warning"}
        icon={<AlertTriangle size={20} />}
        title={"Tips & Tricks"}
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur temporibus doloremque praesentium
          laboriosam iste totam officiis beatae sint non quas."
      />
    </>
  );
}

export default App;
