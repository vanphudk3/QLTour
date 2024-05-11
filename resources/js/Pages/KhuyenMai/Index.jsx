import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage,router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import BasicPagination from "@/Components/MuiPagination";
import { useState } from "react";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import BasicTooltip from "@/Components/Toolip";
import Fab from '@mui/material/Fab';
// import { Checkbox as MuiCheckbox } from '@mui/material';
// hàm cắt chuỗi
function transformText(text) {
  if (text.length > 100) {
      return text.slice(0, 100) + "...";
  }
  return text;
}
export default function Schedule(props) {

    const user = usePage().props;
    const data_user = user.auth.user;
    const get_search = usePage().props.search;

    const schedule = usePage().props.schedules;
    const [scheduleData, setScheduleData] = useState(schedule);
    const [search, setSearch] = useState(get_search);
    const [selectedIds, setSelectedIds] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const deleteSchedule = async (id,confirm = false) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`/api/khuyenmai/delete/${id}?confirm=${confirm}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

            },
          });
          const data = await response.json();
          if (data.status == 'success') {
            Swal.fire({
              icon: 'success',
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
            });
            router.get('/auth/schedule');
          } else {
            Swal.fire({
              icon: 'error',
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              toast: true,
              position: 'top-end',
            });
          }

        }
      });
    }
    const fetchSearch = async (event, value) => {
      const search = event.target.value;
      setSearch(search);
      const response = await fetch(`/api/khuyenmai/search?search=${search}`);
      const data = await response.json();
      const dataFetch = data.data;
      if (data.status == 'success') {
        if (!Array.isArray(dataFetch.data)) {
          setScheduleData({data: []});
          // console.log(scheduleData);
        } else {
          setScheduleData(dataFetch);
        }
      }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Schedule</h2>}
        >
            <Head title="Schedule" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == 'admin' && (
                        <>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteSchedule(selectedIds)}
                            disabled={selectedIds.length == 0}
                            style={{marginRight: '10px'}}
                        >
                            <DeleteForeverIcon />
                        </Button>

                        <BasicTooltip title="Create" placement="top" arrow>
                        <Fab
                            color="primary"
                            aria-label="add"
                        >
                            <Link
                                href={route("khuyenmai.create")}
                                style={{ color: "white" }}
                            >
                            <AddIcon />
                            </Link>
                        </Fab>
                        </BasicTooltip>
                        </>
                        )}
                    </div>
                    <TextField id="standard-basic" label="Search" variant="standard" onChange={fetchSearch} value={search} />
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                <th scope="col" style={{width: "15px"}}>
  <Checkbox 
    onChange={(event) => {
      const newCheckedItems = {};
      scheduleData.data.forEach(item => {
        newCheckedItems[item.id] = event.target.checked;
      });
      setCheckedItems(newCheckedItems);
      if (event.target.checked) {
        setSelectedIds(scheduleData.data.map(item => item.id));
      } else {
        setSelectedIds([]);
      }
    }} 
  />
</th>
                                    <th scope="col" style={{width: "15px"}}>#</th>
                                    <th scope="col">Tên mã giảm</th>
                                    <th scope="col">Giảm theo</th>
                                    <th scope="col">Giá trị</th>
                                    <th scope="col">Số lần sử dụng</th>
                                    <th scope="col">Ngày bắt đầu</th>
                                    <th scope="col">Ngày kết thúc</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleData.data?.map((item, index) => (
                                  <>
                                  <tr>
                                  <td>
  <Checkbox 
    checked={checkedItems[item.id] || false}
    onChange={(event) => {
      setCheckedItems({ ...checkedItems, [item.id]: event.target.checked });
      if (event.target.checked) {
        setSelectedIds([...selectedIds, item.id]);
      } else {
        setSelectedIds(selectedIds.filter(id => id !== item.id));
      }
    }} 
  />
</td>
                                    <th>{item.id}</th>
                                    <td>{item.title}</td>
                                    <td>{item.giam_theo == 0 ? 'Phần trăm' : 'Số tiền'}</td>
                                    <td>{item.gia_tri}</td>
                                    <td>{item.so_lan_su_dung}</td>
                                    <td>{item.ngay_bat_dau}</td>
                                    <td>{item.ngay_ket_thuc}</td>
                                    {/* <td>{item.trang_thai == 0 ? 'Active' : (item.trang_thai == 1 ? 'Sold out' : 'Cancel')}</td> */}
                                    <td>
                                      <Badge 
                                        color={item.trang_thai == 0 ? 'success'  : 'warning'}
                                        badgeContent={item.trang_thai == 0 ? 'Active'  : 'Sold out'}
                                        style={{width: '56px'}}
                                      >
                                      </Badge>
                                      </td>
                                    <td>
                                      {data_user.role == 'admin' && (
                                        <>
                                        <Link
                                      href={route("schedule.edit", item.id)}
                                      variant="text"
                                      color="primary"
                                    >
                                        {/* Edit */}
                                        <EditIcon />
                                    </Link>
                                    <Button
                                      variant="text"
                                      color="error"
                                      onClick={() => deleteSchedule(item.id)}
                                    >
                                        {/* Delete */}
                                        <DeleteForeverIcon />
                                      </Button>
                                      </>
                                      )}
                                    </td>
                                </tr>
                                  </>  
                                ))}
                                {scheduleData.data.length == 0 && (
                                  <tr>
                                        <td colSpan="10" class="text-center">No data</td>
                                    </tr>
                                )}

                                
                            </tbody>
                        </table>
                                {/* <Pagination
                                    links={usePage().props.schedules.links}
                                /> */}
                            <BasicPagination
                                count={scheduleData.last_page}
                                page={scheduleData.current_page}
                                onChange={(event, value) => {
                                  // fetchSearch(event, value);
                                    router.get(`/auth/khuyenmai?page=${value}&search=${search}`);
                                    // router.get(
                                    //     `/auth/category?page=${value}`
                                    // );
                                }}
                            />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
