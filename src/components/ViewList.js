import styles from "./ViewList.module.css";

import { useContext } from 'react';
import ModeContext from '../context/ModeContext';

function ViewList({ list, sum, handleEditProduct}) {
  const modeCtx = useContext(ModeContext);
  return (
    <div>
      <table className={`${styles.table} ${!modeCtx.isLight && styles.dark}`}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Disc %</th>
            <th>Total $</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>{item.total.toFixed(2)}</td>
              <td onClick={() => handleEditProduct(item.id)}>📝</td>
              <td>❌</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.containerSum}>
        Total sum: <span className={styles.sum}>{sum.toFixed(2)}</span>
      </div>
    </div>
  );
}
export default ViewList;
