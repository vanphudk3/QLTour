import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
const xLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderLeft: '2px solid #1976d2',
    width: '20%'
  }));
  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderLeft: '2px solid #198754',
    width: '20%'

  }));
  const Item3 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderLeft: '2px solid #dc3545',
    width: '20%'

  }));
  const Item4 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderLeft: '2px solid #ffc107',
    width: '20%'

  }));
export default function Dashboard(props) {

    const data = usePage().props.data;
    console.log(data);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="row">
                <div className="col-md-12 mb-4">
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{ margin: '0 20px', width: '100%', justifyContent: 'center' }}
                    >
                        <Item1>Tổng số đơn hàng
                            <h5 style={{paddingTop: "5px"}}>{data.tong_don_hang}</h5>
                        </Item1>
                        <Item2>Tổng doanh thu
                            <h5 style={{paddingTop: "5px"}}>{data.doanh_thu}</h5>
                        </Item2>
                        <Item3>Chờ xác nhận
                            <h5 style={{paddingTop: "5px"}}>{data.cho_xac_nhan}</h5>
                        </Item3>
                        <Item4>Đã Xác Nhận
                            <h5 style={{paddingTop: "5px"}}>{data.da_xac_nhan}</h5>
                        </Item4>
                    </Stack>
                </div>
                <div className="col-md-12" style={{width: "87%", margin: "0 116px"}}>
                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Biểu đồ tổng doanh thu theo tháng</h5>
                        </div>
                    </div>
                    <LineChart
  sx={{backgroundColor: "white", padding: "10px", borderRadius: "5px"}}
  xAxis={[{ scaleType: 'point', data: xLabels }]}
    
  series={[
    {
      data: data.doanh_thu_thang_arr,
    },
  ]}
  width={1285}
  height={400}
//   chỉnh css lại cho đẹp
//   style={{backgroundColor: "white", padding: "10px", borderRadius: "5px"}}
/>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
