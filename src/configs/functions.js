import axiosClient from "./axios";
import {toastSuccess} from "./toasts";

export function vnd(price) {
    return String(price).replace(/(.)(?=(\d{3})+$)/g, "$1.") + " VNĐ";
  }

export async function handleDrop(url) {
    await axiosClient.delete(url).then(res => toastSuccess('Products are empty now!'));
}

export async function handleDelete(url,id,setList) {
   await axiosClient.delete(`${url}/${id}`).then(res => {
       toastSuccess('Delete successfully!')
       setList(res);
   });
}

export async function handlePost(url,params) {
    await axiosClient.post(url, params).then(res => {
        toastSuccess('Data saved');
    })
}

export async function handleEdit(url,id,params) {
    await axiosClient.put(`${url}/${id}`,params).then(res => toastSuccess('Updated successfully!'));
}

export  async function handleGetOne(url,id) {
   return await axiosClient.get(`${url}/${id}`);
}