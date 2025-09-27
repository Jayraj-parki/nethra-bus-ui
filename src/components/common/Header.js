"use client";
import Link from 'next/link';
import style from './Header.module.scss';
import { urls } from '@/utils/constants';


export default function Header(props) {
  
  console.log(props)
  return (
    <div className="row align-items-center  mb-lg-4 p-1">
      <div className="col-auto">
        <Link
          href={props?.prevPage || '/'}
          className={`btn btn-outline-0 shadow-0 border ${style.backBtn}`}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Go Back
        </Link>
      </div>
      <div className="mt-3 m-lg-0 col-auto">
        <h4 className={style.pageHeader}>{props?.pageHeader}</h4>
        {
          props?.pageType == '' ? <>
            <div className={`${style.pageSubtitle} mt-2 m-lg-0`}>
              {props?.pageDescription}
            </div>
          </> :
            <div className={`${style.routeInfo} mt-2 m-lg-0`}>
              {props?.pageDescription?.from} &rarr; {props?.pageDescription?.to} <hr className='m-0 p-0 border-0 d-block d-lg-inline' /> &bull; {props?.pageDescription?.date} <hr className='m-0 p-0 border-0 d-block d-lg-inline' /> &bull; {props?.pageDescription?.passengers} {props?.pageDescription?.passengers > 1 ? 'passengers' : 'passenger'}
            </div>
        }

      </div>
      <div className={`col-12 ${style.resultsCount} mt-3 fs-6`}>
        {props?.pageResult}
      </div>
    </div>
  );
}
