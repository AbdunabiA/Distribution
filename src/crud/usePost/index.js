import { useMutation } from "@tanstack/react-query";
import { api, queryBuilder } from "services";

async function postData({
  url,
  values,
  params,
  method = "post",
  onSuccess = () => {},
  onError = () => {},
}) {
  // console.log('post data called');
  return await api[method](queryBuilder(url, params), values)
    .then((data) => {
      console.log('then success');
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
}

const usePost = () => {
  
  return useMutation({ mutationFn: postData, });
};

export default usePost;
