import { BASE_URL } from '../config';

import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { tokenState } from '../recoil/atoms';


export const useMutationHook = (apiUrl, method, options = {}) => {

  const location = useLocation();
  console.log(location.pathname);

  const [token] = useRecoilState(tokenState);

  const mutations = useMutation(async () => {
    const headers = {
      "Content-type": location.pathname === "/profile/weniv_jay/upload" ? "multipart/form-data" : "application/json"
    };
    const res = await axios({
      url: BASE_URL + apiUrl,
      method,
      headers,
    });
    console.warn('요청에 성공했습니다.');
    console.table(res.data)
    return res.data;

  }, {
    onError: err => {
      console.warn('요청에 실패했습니다.');
    },
    onSettled: () => {
      console.warn('요청을 실행합니다.');
    },
    ...options
  });
  return mutations;
};

// ✅ CustomHook 활용 예시
// const uploadSample = useMutations(
//   '/url',              // API 주소
//   'post',              // post, put, delete ...
//   {onSuccess:() => {   // 추가로 실행할 옵션
//     console.log('hahaha');
//}
//);