import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import BasicPagination from "@/Components/MuiPagination";
import React ,{ useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import GroupdBttonCustom from "@/Components/GroupButtonCustom";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Chip from "@mui/material/Chip";
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
    const anchorRef = useRef(null);
    const [selectedItem, setSelectedItem] = React.useState(null);
    // mở dropdown theo từng item theo id của item
    const [open, setOpen] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleToggle = (id) => (event) => {
      console.log(id);
      console.log(event);
  };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const deleteSchedule = async (id, confirm = false) => {
        // check order truoc khi xoa
        const responseCheck = await fetch(`/api/schedule/checkorder/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        });
        const dataCheck = await responseCheck.json();
        let message = "";
        if (dataCheck.status == "info") {
            message = "This schedule has orders, do you want to delete it?";
        } else {
            message = "You won't be able to revert this!";
        }

        Swal.fire({
            title: "Are you sure?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(
                    `/api/schedule/delete/${id}?confirm=${confirm}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                .getAttribute("content"),
                        },
                    }
                );
                const data = await response.json();
                if (data.status == "success") {
                    Swal.fire({
                        icon: "success",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        toast: true,
                        position: "top-end",
                    });
                    router.get("/auth/schedule");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        toast: true,
                        position: "top-end",
                    });
                }
            }
        });
    };
    const fetchSearch = async (event, value) => {
        const search = event.target.value;
        setSearch(search);
        const response = await fetch(`/api/schedule/search?search=${search}`);
        const data = await response.json();
        const dataFetch = data.data;
        if (data.status == "success") {
            if (!Array.isArray(dataFetch.data)) {
                setScheduleData({ data: [] });
                // console.log(scheduleData);
            } else {
                setScheduleData(dataFetch);
            }
        }
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };
    const handleClick = (id) => async (event) => {
        const value = event.target.getAttribute("data-value");
        const data = {
            id: id,
            value: value,
        };
        const response = await fetch(`/api/schedule/updatestatus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        // console.log(responseJson);
        if (responseJson.status == "success") {
            Swal.fire({
                icon: "success",
                title: responseJson.message,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                toast: true,
                position: "top-end",
            });
            router.get("/auth/schedule");
          } else {
            Swal.fire({
                icon: "error",
                title: responseJson.message,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                toast: true,
                position: "top-end",
            });
          }
    };

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
                            {data_user.role == "admin" && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteSchedule(selectedIds)}
                                    disabled={selectedIds.length == 0}
                                >
                                    <DeleteForeverIcon />
                                </Button>
                            )}
                        </div>
                        <TextField
                            id="standard-basic"
                            label="Search"
                            variant="standard"
                            onChange={fetchSearch}
                            value={search}
                        />
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: "15px" }}>
                                        <Checkbox
                                            onChange={(event) => {
                                                const newCheckedItems = {};
                                                scheduleData.data.forEach(
                                                    (item) => {
                                                        newCheckedItems[
                                                            item.id
                                                        ] =
                                                            event.target.checked;
                                                    }
                                                );
                                                setCheckedItems(
                                                    newCheckedItems
                                                );
                                                if (event.target.checked) {
                                                    setSelectedIds(
                                                        scheduleData.data.map(
                                                            (item) => item.id
                                                        )
                                                    );
                                                } else {
                                                    setSelectedIds([]);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th scope="col" style={{ width: "15px" }}>
                                        #
                                    </th>
                                    <th scope="col">Tên tour</th>
                                    <th scope="col">Ngày đi</th>
                                    <th scope="col">Ngày kết thúc</th>
                                    <th scope="col">Số chỗ</th>
                                    <th scope="col">Số chỗ đã đặt</th>
                                    <th scope="col">Số chỗ còn lại</th>
                                    <th scope="col">Người phụ trách</th>
                                    <th scope="col">Status</th>
                                    {data_user.role == "admin" && (
                                    <th scope="col">Action</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleData.data?.map((item, index) => (
                                    <>
                                        <tr>
                                            <td>
                                                <Checkbox
                                                    checked={
                                                        checkedItems[item.id] ||
                                                        false
                                                    }
                                                    onChange={(event) => {
                                                        setCheckedItems({
                                                            ...checkedItems,
                                                            [item.id]:
                                                                event.target
                                                                    .checked,
                                                        });
                                                        if (
                                                            event.target.checked
                                                        ) {
                                                            setSelectedIds([
                                                                ...selectedIds,
                                                                item.id,
                                                            ]);
                                                        } else {
                                                            setSelectedIds(
                                                                selectedIds.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        item.id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <th>{item.ma_tour}</th>
                                            <td>{item.ten_tour}</td>
                                            <td>{item.ngay}</td>
                                            <td>{item.ngay_ket_thuc}</td>
                                            <td>{item.so_cho}</td>
                                            <td>{item.so_cho_da_dat == null ? 0 : item.so_cho_da_dat}</td>
                                            <td>
                                                {item.so_cho_da_dat == 0 || item.so_cho_da_dat == null
                                                    ? item.so_cho
                                                    : item.so_cho - item.so_cho_da_dat}
                                            </td>
                                            <td>
                                                {item.nguoi_phu_trach == null
                                                    ? "Chưa có"
                                                    : item.nguoi_phu_trach}
                                            </td>
                                            <td>
                                                {data_user.role == "admin" ? (                                            
                                                <div class="btn-group">
  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {item.trang_thai == 0 ? "Active" : item.trang_thai == 1 ? "Completed" : "Cancel"}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#" onClick={handleClick(item.id)} data-value="0">Active</a></li>
    <li><a class="dropdown-item" href="#" onClick={handleClick(item.id)} data-value="1">Completed</a></li>
    <li><a class="dropdown-item" href="#" onClick={handleClick(item.id)} data-value="2">Cancel</a></li>
  </ul>
</div>
                                                ) : (
                                                    <Chip
                                                        label={
                                                            item.trang_thai == 0
                                                                ? "Active"
                                                                : item.trang_thai == 1
                                                                ? "Completed"
                                                                : "Cancel"
                                                        }
                                                        color={
                                                            item.trang_thai == 0
                                                                ? "primary"
                                                                : item.trang_thai == 1
                                                                ? "success"
                                                                : "error"
                                                        }
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                {data_user.role == "admin" && (
                                                    <>
                                                        <Link
                                                            href={route(
                                                                "schedule.edit",
                                                                item.id
                                                            )}
                                                            variant="text"
                                                            color="primary"
                                                        >
                                                            {/* Edit */}
                                                            <EditIcon />
                                                        </Link>
                                                        <Button
                                                            variant="text"
                                                            color="error"
                                                            onClick={() =>
                                                                deleteSchedule(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            {/* Delete */}
                                                            <DeleteForeverIcon />
                                                        </Button>
                                                    </>
                                                )}
                                                {/* {data_user.role != "admin" && (
                                                    <>
                                                        <Link
                                                            href={route(
                                                                "schedule.edit",
                                                                item.id
                                                            )}
                                                            class="btn btn-primary disabled"
                                                            aria-disabled="true"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "schedule.destroy",
                                                                item.id
                                                            )}
                                                            class="btn btn-danger disabled"
                                                            aria-disabled="true"
                                                            method="delete"
                                                            name="delete"
                                                            as="button"
                                                            type="button"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </>
                                                )} */}
                                            </td>
                                        </tr>
                                    </>
                                ))}
                                {scheduleData?.data?.length == 0 && (
                                    <tr>
                                        <td colSpan="10" class="text-center">
                                            No data
                                        </td>
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
                                router.get(
                                    `/auth/schedule?page=${value}&search=${search}`
                                );
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
