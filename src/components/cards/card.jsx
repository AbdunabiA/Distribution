import { Card } from "antd";
import styles from "./card.module.scss";
import { formatNums } from "services/formatNums";

const MainCard = ({ cart_text, total_amount, Icon, currency, onClick }) => {
  return (
    <Card
      bordered={false}
      className={onClick ? styles.hasOnClick : styles.card}
      onClick={onClick}
    >
      <div className={styles.top_title}>
        <Icon />

        <h3 className={styles.cart_text}>{cart_text}</h3>
      </div>
      <div className={styles.b_total}>
        <h1 className={styles.b_total_text}>
          <p>{formatNums(total_amount)}</p>
          <span>{currency}</span>
        </h1>
        {/* <p
          style={r_b_amount < 0 ? { color: "red" } : { color: "green" }}
          className={styles.r_b_text}
        >
          {r_b_amount}%
        </p> */}
      </div>
    </Card>
  );
};

export default MainCard;
