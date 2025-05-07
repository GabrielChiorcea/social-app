import style from './Bedge.module.scss';

const BedgeSvg = (props) => {
  let color = '#FFD700';
  let place = 1;
  if (props.place === 1) {
    color = '#d9e2e4';
    place = 2;
  }
  if (props.place === 2) {
    color = '#ffa142 ';
    place = 3;
  }

  return (
    <div className={style.bedgeContainer}>
      <span className={style.position}>{place}</span>
      <svg
        className={style.star}
        style={{ fill: color }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="43"
        height="43"
        viewBox="0 0 32 32"
      >
        <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
      </svg>

      <svg
        className={style.bedge}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 32 32"
      >
        <path d="M6 0v32l10-10 10 10v-32z"></path>
      </svg>
    </div>
  );
};

export default BedgeSvg;
