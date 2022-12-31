import React from "react";
import Breadcumb from "../../../components/Breadcumb";
import BlogCard from "../../../components/cards/BlogCard";
import MainLayout from "../../../components/layouts/MainLayout";
import Meta from "../../../components/Meta";

const data = `<div><p>Cảnh sát vùng Manchester, miền bắc nước <a href="https://vnexpress.net/chu-de/anh-2332">Anh</a>, ngày 17/8 thông báo đã xác định 4 nạn nhân riêng rẽ sau khi giám định những thi thể thu thập sau vụ cháy hồi tháng 5 tại xưởng gỗ Bismark House, thị trấn <a href="https://vnexpress.net/the-gioi/anh-phat-hien-thi-the-nghi-la-nguoi-viet-trong-nha-may-bi-chay-4492406.html">Oldham</a>. Đây là lần đầu tiên giới chức Anh xác nhận có 4 người thiệt mạng trong sự việc.</p><p>&nbsp;</p><p>"Chúng tôi đang xác minh danh tính, nhưng quá trình tìm kiếm tại hiện trường sẽ tiếp tục cho đến khi không còn phát hiện thi thể hay đồ vật quan trọng. Việc này có thể kéo dài thêm nhiều tuần", thám tử Lewis Hughes, trưởng nhóm xác định nạn nhân của cảnh sát vùng Manchester, cho hay.</p><p>&nbsp;</p><p>Giới chức Manchester trước đó công bố danh tính 4 người Việt mất tích, có khả năng liên quan vụ cháy ở Bismark House gồm Cuong Van Chu (39 tuổi), Uoc Van Nguyen (31 tuổi), Duong Van Nguyen (29 tuổi) and Nam Thanh Le (21 tuổi). Cảnh sát Anh hôm 12/8 thông báo đã xác định được danh tính một nạn nhân là Uoc Van Nguyen dựa trên phân tích dấu vân tay.</p><figure class="image"><img src="https://res.cloudinary.com/do8rqqyn4/image/upload/v1660818741/yyk5iygpnp0njywdwopk.jpg" srcset="https://res.cloudinary.com/do8rqqyn4/image/upload/w_160%2Cc_scale/v1660818741/yyk5iygpnp0njywdwopk.jpg 160w, https://res.cloudinary.com/do8rqqyn4/image/upload/w_500%2Cc_scale/v1660818741/yyk5iygpnp0njywdwopk.jpg 500w, https://res.cloudinary.com/do8rqqyn4/image/upload/w_1000%2Cc_scale/v1660818741/yyk5iygpnp0njywdwopk.jpg 1000w, https://res.cloudinary.com/do8rqqyn4/image/upload/v1660818741/yyk5iygpnp0njywdwopk.jpg 1052w" sizes="100vw" width="1052"><figcaption>Hiện trường vụ cháy nhà máy ở thị trấn Oldham, Anh, hồi tháng 5. Ảnh: <i>Sở cứu hỏa Oldham</i>.</figcaption></figure><p>Trong thông cáo ngày 17/8, Bộ Ngoại giao cho biết Cục Lãnh sự và Đại sứ quán Việt Nam tại Anh luôn theo sát diễn biến, phối hợp với các cơ quan chức năng hai nước xác định nhân thân các nạn nhân, thúc đẩy điều tra, làm rõ sự việc và hỗ trợ gia đình nạn nhân những vấn đề hậu sự theo nguyện vọng của gia đình.</p><p>&nbsp;</p><p>Đám cháy bùng phát tại xưởng gỗ Bismark House rạng sáng 7/5. Sở cứu hỏa vùng Manchester đã điều động 10 xe chữa cháy để đối phó vụ hỏa hoạn. Tại thời điểm vụ hỏa hoạn xảy ra, cảnh sát tin rằng không có ai ở bên trong. Đám cháy được dập tắt 4 ngày sau đó.</p><p>&nbsp;</p><p>Cảnh sát ngày 21/7 nhận được cuộc gọi thông báo về 4 người Việt mất tích và "có thể liên quan đến vụ cháy". Hai ngày sau, các công nhân phá dỡ nhà máy Bismark House phát hiện các thi thể tại hiện trường vụ hỏa hoạn.</p></div>`;

const DetailBlog = () => {
  return (
    <>
      <Meta
        title="Blog | PWM - Learning"
        image="https://www.tierra.vn/files/800x/nch2401-r_01-600x600--hbNwpqDZma.jpg"
        description=""
      />
      <MainLayout>
        <div className="max-w-[860px] mx-auto px-2 py-4">
          <Breadcumb current="Blog" />
          <div className="mt-10 leading-8">
            <h1 className="font-bold text-lg">
              Trao gửi yêu thương - Time for gifts ♥️ Ưu đãi ngay 15% cho trang
              sức kim cương
            </h1>
            <p className="text-[#666] text-sm mt-2">Ngày 31/12/2022</p>
            <div className="mt-5">
              <div dangerouslySetInnerHTML={{ __html: data }} />
            </div>

            <div className="mt-5 pb-10">
                <h2 className="font-bold uppercase text-primary text-center">Có thể bạn quan tâm</h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-2">
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default DetailBlog;

