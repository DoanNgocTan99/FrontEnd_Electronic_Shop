import React from 'react';
import { Link } from 'react-router-dom';
import s from './Confirm.module.scss';

function Confirm() {
	return (
		<div className={s.body}>
			<div>
				<p className={s.text}>Thanh Toán Thành Công, Trở Về Trang Chủ</p>
			</div>
			<button className={s.button}>
				<Link className={s.link} to="/">
					Home
				</Link>
			</button>
		</div>
	);
}

export default Confirm;
