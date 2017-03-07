const types = {
  DEVICE_WITH_1224: 1224 // < mobile,> desktop
};
const apiLink = function (url) {
  let api = 'http://api.homefinder.vn'; //10.10.0.7:1991
  if (url.indexOf('http') > -1) {
    return url;
  }
  return api + url;
};
const authLink = function (url) {
  let api = 'http://api.homefinder.vn';
  if (url.indexOf('http') > -1) {
    return url;
  }
  return api + url;
};
const socketLink = function (url) {
  let api = 'http://api.homefinder.vn';
  if (url.indexOf('http') > -1) {
    return url;
  }
  return api + url;
};

const apiTestLink = function (url) {
  let api = 'http://api.homefinder.vn';
  if (url.indexOf('http') > -1) {
    return url;
  }
  return api + url;
};

const listEstateType = [
  { value: 'lts_1', label: 'Tất cả Tài Sản' },
  { value: 52, label: 'Biệt thự - villa' },
  { value: 50, label: 'Nền dự án/khu dân cư mới' },
  { value: 90, label: 'Officetel' },
  { value: 62, label: 'Khách sạn' },
  { value: 57, label: 'Văn phòng' },
  { value: 53, label: 'Nhà Phố' },
  { value: 51, label: 'Nhà' },
  { value: 43, label: 'Đất' },
  { value: 38, label: 'Căn hộ' },
  { value: 74, label: 'Căn hộ dịch vụ' },
  { value: 68, label: 'Bán lẻ' },
  { value: 99, label: 'Khu công nghiệp, khu chế xuất' },
  { value: 97, label: 'Shophouse' },
  { value: 95, label: 'Penhouse' }
];
function getEstateByID(id) {
  let label = '';
  listEstateType.map(v => {
    if (v.value === id) {
      label = v.label;
    }
  });
  return label;
}
const listEstateJuridical = [
  { value: 0, label: 'Không xác định' },
  { value: 1, label: 'Sổ hồng/Sổ đỏ' },
  { value: 2, label: 'Đang hợp thức hóa' },
  { value: 3, label: 'Chủ quyền tư nhân' },
  { value: 4, label: 'Giấy tờ hợp lệ' },
  { value: 5, label: 'Giấy tay' },
  { value: 6, label: 'Hợp đồng mua bán' },
  { value: 7, label: 'Giấy phép kinh doanh' },
  { value: 8, label: 'Giấy phép xây dựng' }
];

const listEstateStatus = [
  { value: 0, label: 'Không xác định' },
  { value: 1, label: 'Mới' },
  { value: 2, label: 'Cũ ở được' }
];

const listEstateView = [
  { value: 'Sông SG', label: 'Sông SG' },
  { value: 'Chợ', label: 'Chợ' },
  { value: 'Thảo Cầm Viên trực diện', label: 'Thảo Cầm Viên trực diện' },
  { value: 'Công viên', label: 'Công viên' },
  { value: 'Quận 2', label: 'Quận 2' }
];
const listEstateDirection = [
  { value: 'Đông', label: 'Đông' },
  { value: 'Tây', label: 'Tây' },
  { value: 'Nam', label: 'Nam' },
  { value: 'Bắc', label: 'Bắc' },
  { value: 'Đông Bắc', label: 'Đông Bắc' },
  { value: 'Đông Nam', label: 'Đông Nam' },
  { value: 'Tây Bắc', label: 'Tây Bắc' },
  { value: 'Tây Nam', label: 'Tây Nam' }
];
const listSideMenu = [
  { name: 'Quản lý giỏ hàng', route: 'cart', avatar_url: '', subtitle: '1' },
  { name: 'Lịch sử thao tác', route: 'history', avatar_url: '', subtitle: '2' },
  { name: 'Quản lý khách hàng', route: 'customer', avatar_url: '', subtitle: '3' },
  { name: 'Quản lý thành viên', route: 'user', avatar_url: '', subtitle: '4' },
];
const statusExplit = [
  { value: 'all', label: 'Tất cả Trạng thái' },
  { value: 'rent', label: 'Cho thuê' },
  { value: 'are_renting', label: 'Đang cho thuê' },
  { value: 'sell', label: 'Bán' },
  { value: 'placed', label: 'Đặt chỗ' },
  { value: 'transfer', label: 'Chuyển nhượng' },
  { value: 'origin_1', label: 'Đang khai thác' },
  { value: 'origin_2', label: 'Đã khai thác' },
];
const listArea = [
  { value: 0, label: 'Tất cả Diện tích' },
  { value: 1, label: '<= 50 m²' },
  { value: 2, label: '50-100 m²' },
  { value: 3, label: '100-150 m²' },
  { value: 4, label: '150-200 m²' },
  { value: 5, label: '>200 m²' },
];
const listPrice = [
  { value: 0, label: 'Tất cả Giá' },
  { value: -1, label: 'Giá bán - Chuyển nhượng' },
  { value: 1, label: '<= 1tỷ' },
  { value: 2, label: '1tỷ - 2tỷ' },
  { value: 3, label: '2tỷ - 3tỷ' },
  { value: 4, label: '3tỷ - 4tỷ' },
  { value: 5, label: '4tỷ - 5tỷ' },
  { value: 6, label: '5tỷ - 10tỷ' },
  { value: 7, label: '> 10tỷ' },
  { value: -1, label: 'Giá thuê - cho thuê (vnđ)' },
  { value: 8, label: '<= 5tr' },
  { value: 9, label: '5tr - 10tr' },
  { value: 10, label: '10tr - 40tr' },
  { value: 11, label: '40tr - 70tr' },
  { value: 12, label: '> 70tr' },
  { value: -1, label: 'Giá thuê - cho thuê ($)' },
  { value: 12, label: '<= 300' },
  { value: 14, label: '300 - 500' },
  { value: 15, label: '500 - 1000' },
  { value: 16, label: '1000 - 3000' },
  { value: 17, label: '3000 - 5000' },
  { value: 18, label: '> 5000' },
];


export {
  types, apiLink, apiTestLink, authLink, socketLink, listArea, listPrice,
  listEstateType, listEstateJuridical, listEstateStatus, listEstateView,
  listEstateDirection, getEstateByID, listSideMenu, statusExplit
};
