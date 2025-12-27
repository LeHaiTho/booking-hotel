This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

CẤU TRÚC TỔ CHỨC
my-react-native-app/
├── android/ # Thư mục chứa mã nguồn Android
├── ios/ # Thư mục chứa mã nguồn iOS
├── src/ # Thư mục chứa mã nguồn chính của ứng dụng
│ ├── assets/ # Chứa các tài nguyên tĩnh (hình ảnh, font, JSON, v.v.)
│ │ ├── images/ # Hình ảnh
│ │ ├── fonts/ # Font chữ
│ │ └── data/ # Dữ liệu JSON hoặc file tĩnh khác
│ ├── components/ # Chứa các component tái sử dụng
│ │ ├── common/ # Component chung (Button, Input, v.v.)
│ │ ├── ui/ # Component UI (Modal, Card, v.v.)
│ │ └── ... # Các component khác
│ ├── constants/ # Chứa các hằng số (màu sắc, kích thước, API endpoints, v.v.)
│ ├── navigation/ # Quản lý điều hướng (React Navigation)
│ │ ├── AppNavigator.js # Cấu hình chính của navigation
│ │ ├── stacks/ # Các stack navigator
│ │ ├── tabs/ # Các tab navigator
│ │ └── ... # Các loại navigator khác
│ ├── screens/ # Chứa các màn hình (screens) của ứng dụng
│ │ ├── HomeScreen/ # Màn hình Home
│ │ ├── ProfileScreen/ # Màn hình Profile
│ │ └── ... # Các màn hình khác
│ ├── services/ # Chứa các service (API calls, network, v.v.)
│ ├── store/ # Quản lý state (Redux, Zustand, v.v.)
│ │ ├── slices/ # Redux slices (nếu dùng Redux Toolkit)
│ │ ├── actions/ # Redux actions (nếu dùng Redux)
│ │ ├── reducers/ # Redux reducers (nếu dùng Redux)
│ │ └── store.js # Cấu hình store
│ ├── hooks/ # Chứa các custom hooks
│ ├── utils/ # Chứa các hàm tiện ích (helpers, formatters, v.v.)
│ ├── contexts/ # Chứa các React Context (nếu sử dụng)
│ ├── theme/ # Chứa cấu hình theme (màu sắc, font, spacing, v.v.)
│ ├── App.js # File entry point của ứng dụng
│ └── index.js # File khởi chạy ứng dụng
├── .env # File cấu hình môi trường
├── .eslintrc.js # Cấu hình ESLint
├── .prettierrc.js # Cấu hình Prettier
├── babel.config.js # Cấu hình Babel
├── metro.config.js # Cấu hình Metro Bundler
├── package.json # File quản lý dependencies
└── README.md # Tài liệu dự án
my-react-native-app/
├── **tests**/
│ └── App.test.js
├── android/
├── ios/
├── src/
│ ├── assets/
│ │ ├── images/
│ │ └── fonts/
│ ├── components/
│ │ ├── Button/
│ │ └── Input/
│ ├── config/
│ │ ├── colors.js
│ │ └── api.js
│ ├── constants/
│ │ └── routes.js
│ ├── context/
│ │ └── AuthContext.js
│ ├── hooks/
│ │ └── useFetch.js
│ ├── navigation/
│ │ └── AppNavigator.js
│ ├── screens/
│ │ ├── Home/
│ │ └── Profile/
│ ├── services/
│ │ └── apiService.js
│ ├── store/
│ │ ├── actions/
│ │ ├── reducers/
│ │ └── store.js
│ ├── styles/
│ │ └── globalStyles.js
│ ├── utils/
│ │ └── dateFormatter.js
│ └── App.js
├── .env
├── .eslintrc.js
├── .prettierrc.js
├── babel.config.js
├── metro.config.js
├── package.json
└── README.md
màu sắc:
#003b95
#E5E5E5
#666666
#D8E7FA
#FFB700
#058633

<!-- Nút gửi tin nhắn -->

<TouchableOpacity
style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#0165FC',
            width: '100%',
            gap: 10,
            borderRadius: 3,
          }}>
<Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
Thêm chi tiết còn thiếu
</Text>
</TouchableOpacity>

<TouchableOpacity
style={{
                      paddingVertical: 10,
                    }}>
<Text
style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
Xem tất cả
</Text>
</TouchableOpacity>

// "react-native-gesture-handler": "^2.9.0",
// "react-native-safe-area-context": "^4.10.1",
// "react-native-screens": "^4.4.0",
// "@gorhom/bottom-sheet": "^5.0.6",
// "@react-native-masked-view/masked-view": "^0.3.2",
// "@react-navigation/bottom-tabs": "^7.2.0",
// "@react-navigation/elements": "^2.2.5",
// "@react-navigation/native": "^7.0.14",
// "@react-navigation/native-stack": "^7.2.0",
// "@react-navigation/stack": "^7.1.1",

Booking.com là một trong những nền tảng đặt phòng khách sạn lớn nhất thế giới, cung cấp nhiều tính năng đa dạng và tiện ích để hỗ trợ người dùng trong việc tìm kiếm, đặt chỗ và quản lý đặt phòng. Dưới đây là các chức năng chính của ứng dụng Booking.com hiện tại:

1. Tìm kiếm khách sạn
   Tìm kiếm theo địa điểm: Người dùng có thể tìm kiếm khách sạn theo thành phố, điểm đến, hoặc địa điểm cụ thể.

Lọc kết quả:

Theo giá cả, hạng sao, loại chỗ ở (khách sạn, căn hộ, biệt thự, v.v.).

Theo tiện ích (wifi miễn phí, bể bơi, bữa sáng, v.v.).

Theo khoảng cách từ trung tâm hoặc địa điểm nổi tiếng.

Bản đồ tích hợp: Hiển thị vị trí khách sạn trên bản đồ để người dùng dễ dàng lựa chọn.

2. Đặt phòng
   Đặt phòng nhanh chóng: Người dùng có thể đặt phòng trực tiếp trên ứng dụng.

Thanh toán linh hoạt:

Thanh toán trực tuyến bằng thẻ tín dụng, ví điện tử, hoặc các phương thức thanh toán khác.

Tùy chọn thanh toán tại khách sạn (Pay at Property).

Xác nhận ngay lập tức: Nhận email và thông báo xác nhận đặt phòng ngay sau khi hoàn tất.

3. Quản lý đặt phòng
   Xem chi tiết đặt phòng: Người dùng có thể xem thông tin về khách sạn, ngày nhận phòng, ngày trả phòng, giá cả, và chính sách hủy phòng.

Chỉnh sửa đặt phòng: Thay đổi thông tin đặt phòng (nếu khách sạn cho phép).

Hủy đặt phòng: Hủy phòng trực tiếp trên ứng dụng (nếu chính sách hủy phòng cho phép).

4. Đánh giá và nhận xét
   Đọc đánh giá: Người dùng có thể xem đánh giá và nhận xét từ những khách hàng đã từng ở tại khách sạn.

Viết đánh giá: Sau khi hoàn thành chuyến đi, người dùng có thể viết đánh giá và chia sẻ trải nghiệm của mình.

5. Ưu đãi và khuyến mãi
   Giá ưu đãi: Hiển thị các ưu đãi đặc biệt, giảm giá, hoặc gói dịch vụ hấp dẫn.

Chương trình thành viên Genius: Người dùng có thể đăng ký chương trình thành viên để nhận ưu đãi độc quyền.

6. Hỗ trợ khách hàng
   Trò chuyện trực tiếp: Người dùng có thể liên hệ với bộ phận hỗ trợ khách hàng qua chat trực tiếp trên ứng dụng.

Câu hỏi thường gặp (FAQ): Cung cấp thông tin giải đáp các thắc mắc phổ biến.

7. Lưu trữ yêu thích
   Danh sách yêu thích: Người dùng có thể lưu các khách sạn yêu thích để xem lại sau.

Nhắc nhở đặt phòng: Nhận thông báo khi giá phòng giảm hoặc khi khách sạn sắp hết phòng.

8. Tích hợp các dịch vụ khác
   Đặt vé máy bay: Người dùng có thể đặt vé máy bay kết hợp với đặt phòng khách sạn.

Thuê xe: Tích hợp dịch vụ thuê xe để thuận tiện cho chuyến đi.

Tour và hoạt động: Đặt các tour du lịch hoặc hoạt động giải trí tại điểm đến.

9. Thông báo và nhắc nhở
   Thông báo giá: Nhận thông báo khi giá phòng thay đổi.

Nhắc nhở đặt phòng: Nhắc nhở người dùng đặt phòng nếu họ đã xem một khách sạn nhiều lần.

Thông báo chuyến đi: Nhắc nhở về ngày nhận phòng, ngày trả phòng, và các thông tin liên quan đến chuyến đi.

10. Đa ngôn ngữ và đa tiền tệ
    Hỗ trợ nhiều ngôn ngữ: Ứng dụng hỗ trợ nhiều ngôn ngữ để phục vụ người dùng toàn cầu.

Chuyển đổi tiền tệ: Người dùng có thể xem giá phòng bằng nhiều loại tiền tệ khác nhau.

11. Chế độ Offline
    Truy cập thông tin đặt phòng offline: Người dùng có thể xem thông tin đặt phòng ngay cả khi không có kết nối internet.

12. Bảo mật và an toàn
    Bảo mật thông tin: Đảm bảo thông tin cá nhân và thanh toán của người dùng được bảo vệ.

Xác thực hai lớp: Tăng cường bảo mật cho tài khoản người dùng.

13. Tích hợp với các nền tảng khác
    Liên kết với Google Maps: Giúp người dùng dễ dàng tìm đường đến khách sạn.

Tích hợp với Apple Wallet/Google Pay: Lưu thông tin đặt phòng vào ví điện tử để tiện theo dõi.

14. Chức năng dành cho chủ khách sạn
    Quản lý đặt phòng: Chủ khách sạn có thể quản lý đặt phòng, cập nhật thông tin phòng, và xem đánh giá từ khách hàng.

Nhận thông báo: Nhận thông báo về các đặt phòng mới hoặc yêu cầu từ khách hàng.

<!-- Công việc ngày 15/2 -->

npm i react-native-calendars

<!-- Quy trình github -->

🔥 Quy trình làm việc với Git theo từng chức năng
🛠️ Pull code mới nhất từ remote repository
Trước khi bắt đầu làm việc, luôn đảm bảo code của bạn cập nhật mới nhất từ nhánh chính (main hoặc develop):

sh
Sao chép
Chỉnh sửa
git checkout develop # Chuyển sang nhánh develop (hoặc main)
git pull origin develop # Lấy code mới nhất
📌 Tạo nhánh mới cho từng chức năng
Mỗi chức năng mới nên có một nhánh riêng để dễ quản lý:

sh
Sao chép
Chỉnh sửa
git checkout -b feature/ten-chuc-nang
Ví dụ: Nếu bạn đang làm tính năng đăng nhập, bạn có thể đặt tên nhánh là:

sh
Sao chép
Chỉnh sửa
git checkout -b feature/login
👨‍💻 Code & Commit từng thay đổi nhỏ
Khi viết code, nên chia commit thành từng phần nhỏ, mỗi commit thể hiện một bước quan trọng:

sh
Sao chép
Chỉnh sửa
git add . # Thêm tất cả file thay đổi vào staging
git commit -m "Thêm giao diện đăng nhập"
👉 Lưu ý: Viết commit message rõ ràng và có ý nghĩa.

🔄 Luôn đồng bộ với nhánh chính
Trước khi push code lên, bạn nên pull code mới nhất từ nhánh chính (develop hoặc main) để tránh conflict:

sh
Sao chép
Chỉnh sửa
git checkout develop # Chuyển sang nhánh chính
git pull origin develop # Lấy code mới nhất
git checkout feature/login # Quay lại nhánh tính năng
git merge develop # Gộp code mới nhất vào nhánh đang làm
Nếu có conflict, bạn cần giải quyết xung đột, sau đó commit lại.

🚀 Push code lên GitHub
Khi hoàn thành tính năng, bạn push code lên repository:

sh
Sao chép
Chỉnh sửa
git push origin feature/login
📢 Tạo Pull Request (PR) để merge vào develop/main

Vào GitHub/GitLab/Bitbucket
Tạo Pull Request (PR) từ feature/login vào develop
Chờ code review và fix nếu cần
Sau khi được duyệt, merge vào develop hoặc main
🧹 Xóa nhánh sau khi merge
Sau khi chức năng đã được merge thành công, hãy xóa nhánh cũ để dọn dẹp:

sh
Sao chép
Chỉnh sửa
git branch -d feature/login # Xóa nhánh local
git push origin --delete feature/login # Xóa nhánh trên GitHub
📌 Tóm tắt quy trình chuẩn Git khi làm việc theo từng chức năng
1️⃣ Pull code mới nhất
2️⃣ Tạo nhánh riêng cho chức năng
3️⃣ Code & Commit từng thay đổi nhỏ
4️⃣ Pull code mới nhất từ nhánh chính trước khi push
5️⃣ Push code lên GitHub
6️⃣ Tạo Pull Request để merge vào nhánh chính
7️⃣ Xóa nhánh sau khi merge thành công

👉 Nếu team bạn làm theo Git Flow, bạn có thể mở rộng với các nhánh như:

feature/_ (Tính năng mới)
bugfix/_ (Fix bug)
hotfix/\* (Sửa lỗi khẩn cấp)
"react-native-safe-area-context": "^4.10.1",

<TouchableOpacity
style={{
            backgroundColor: '#fff',
            padding: 14,
            borderWidth: 0.2,
            borderColor: '#ccc',
            borderRadius: 2,
            gap: 15,
          }}>
<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
<View style={{flex: 1, gap: 10}}>
<Text
style={{
                  color: '#0156ff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
Phòng Giường Đôi Có Ban Công
</Text>
<View>
<View
style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
<IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
<Text
style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
1 giường đôi
</Text>
</View>
<View
style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
<IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
<Text
style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
Diện tích: 21 m2
</Text>
</View>
</View>
</View>
<Image
source={{
                uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
              }}
style={{width: 60, height: 60, borderRadius: 5}}
/>
</View>
<View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
{amenities?.map(item => (
<View
key={item.id}
style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
<IconComponent
                  name={item.icon.name}
                  library={item.icon.library}
                  size={15}
                />
<Text
style={{
                    fontSize: 14,
                    color: '#000',
                  }}>
{item.name}
</Text>
</View>
))}
</View>

          {/* lựa chọn */}
          <View
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderColor: '#ccc',
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <IconComponent
                name="people"
                library="SimpleLineIcons"
                size={18}
              />
              <Text
                style={{
                  color: '#000',
                }}>
                giá cho 2 người lớn
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Hủy miễn phí{' '}
                <Text style={{fontWeight: 'normal'}}>
                  18:00, 24 tháng 1, 2025
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thanh toán trước{' '}
                <Text style={{fontWeight: 'normal'}}>
                  - thanh toán tại chỗ nghỉ
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thẻ tín dụng
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <IconComponent
                name="coffee"
                library="FontAwesome"
                size={15}
                color="#000"
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                Giá cho 2 đêm
              </Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VNĐ 3.000.000
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  VNĐ 1.350.000
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Đã bao gồm thuế và phí
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#0165FC',
                  gap: 10,
                }}>
                <Text
                  style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                  Lựa chọn và tùy chỉnh
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 14,
            borderWidth: 0.2,
            borderColor: '#ccc',
            borderRadius: 2,
            gap: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, gap: 10}}>
              <Text
                style={{
                  color: '#0156ff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Phòng Giường Đôi Có Ban Công
              </Text>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    1 giường đôi
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Diện tích: 21 m2
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={{
                uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
              }}
              style={{width: 60, height: 60, borderRadius: 5}}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
            {amenities?.map(item => (
              <View
                key={item.id}
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name={item.icon.name}
                  library={item.icon.library}
                  size={15}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* lựa chọn */}
          <View
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderColor: '#ccc',
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <IconComponent
                name="people"
                library="SimpleLineIcons"
                size={18}
              />
              <Text
                style={{
                  color: '#000',
                }}>
                giá cho 2 người lớn
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Hủy miễn phí{' '}
                <Text style={{fontWeight: 'normal'}}>
                  18:00, 24 tháng 1, 2025
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thanh toán trước{' '}
                <Text style={{fontWeight: 'normal'}}>
                  - thanh toán tại chỗ nghỉ
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thẻ tín dụng
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <IconComponent
                name="coffee"
                library="FontAwesome"
                size={15}
                color="#000"
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                Giá cho 2 đêm
              </Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VNĐ 3.000.000
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  VNĐ 1.350.000
                </Text>
                <IconComponent
                  name="infocirlceo"
                  library="AntDesign"
                  size={18}
                  color="#0165FC"
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Đã bao gồm thuế và phí
              </Text>
              {/* <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#0165FC',
                  gap: 10,
                }}>
                <Text
                  style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                  Lựa chọn và tùy chỉnh
                </Text>
              </TouchableOpacity> */}
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#0165FC',
                    gap: 10,
                    flex: 1,
                  }}>
                  <Text
                    style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                    1 phòng
                  </Text>
                  <IconComponent
                    name="angle-down"
                    library="FontAwesome"
                    size={18}
                    color="#0165FC"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#F20000',
                    gap: 10,
                  }}>
                  <IconComponent
                    name="delete"
                    library="AntDesign"
                    size={20}
                    color="#F20000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>

"@react-navigation/bottom-tabs": "^7.3.1", "@react-navigation/native-stack": "^7.2.0",
"@react-navigation/stack": "^7.1.1","@react-navigation/native": "^7.0.14",
"@react-navigation/elements": "^2.2.5",
"react-native-gesture-handler": "^2.18.1", "react-native-reanimated": "^3.16.7",

   <Header
        hotelInfo={{
          imageUrl:
            'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
          name: 'Grant Hotel',
          roomType: 'Phòng đơn 1 giường',
          stayDetails: '1 đêm 2 người lớn',
          date: 'Ngày 14/04/2025',
        }}
      />
      <View
        style={{
          gap: 10,
          paddingHorizontal: 16,
          marginVertical: 16,
        }}>
        <RatingSelector
          items={OVERALL_SCORES}
          selectedScore={ratings.overall}
          onSelect={handleOverallRating}
        />
        <RatingSelector
          items={STAFF_SCORES}
          selectedScore={ratings.staff}
          onSelect={handleStaffRating}
        />
        <RatingSelector
          items={FACILITY_SCORES}
          selectedScore={ratings.facility}
          onSelect={handleFacilityRating}
          showIcon
        />
        <RatingSelector
          items={FACILITY_SCORES}
          selectedScore={ratings.facility}
          onSelect={handleFacilityRating}
          showIcon
        />
        <RatingSelector
          items={FACILITY_SCORES}
          selectedScore={ratings.facility}
          onSelect={handleFacilityRating}
          showIcon
        />
        <RatingSelector
          items={CLEAN_SCORES}
          selectedScore={ratings.clean}
          onSelect={handleCleanRating}
          showIcon
        />
        <RatingSelector
          items={FACILITY_SCORES}
          selectedScore={ratings.facility}
          onSelect={handleFacilityRating}
          showIcon
        />

        <RatingSelector
          items={MONEY_SCORES}
          selectedScore={ratings.money}
          onSelect={handleMoneyRating}
          showIcon
        />
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor: pressed
                ? COLORS.primaryLight
                : canProceed
                ? COLORS.primary
                : COLORS.gray,
            },
          ]}
          onPress={handleNext}
          disabled={!canProceed}>
          <Text style={styles.buttonText}>Hoàn thành</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor: pressed
                ? COLORS.primaryLight
                : canProceed
                ? COLORS.primary
                : COLORS.gray,
            },
          ]}
          onPress={handleNext}
          disabled={!canProceed}>
          <Text style={styles.buttonText}>Hoàn thành</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor: pressed
                ? COLORS.primaryLight
                : canProceed
                ? COLORS.primary
                : COLORS.gray,
            },
          ]}
          onPress={handleNext}
          disabled={!canProceed}>
          <Text style={styles.buttonText}>Hoàn thành</Text>
        </Pressable>
      </View>

import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';

import {
FlatList,
ScrollView,
Text,
TouchableOpacity,
View,
TextInput,
Image,
Dimensions,
StyleSheet,
Pressable,
Modal,
TouchableWithoutFeedback,
Linking,
} from 'react-native';
// import {Icon} from 'react-native-vector-icons/Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import ModalComponent from '@components/ModalComponent';
import SearchComponent from '@components/SearchComponent';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
BottomSheetBackdrop,
BottomSheetModal,
BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import {API_URL, formatDate} from '@utils/constants';
import useAuthStore from '@stores/authStore';

// Tạo kiểu dữ liệu cho icon để đảm bảo nó có cấu trúc đúng
type IconType = {
name: string;
library:
| 'AntDesign'
| 'Ionicons'
| 'SimpleLineIcons'
| 'Feather'
| 'MaterialCommunityIcons'
| 'Foundation'
| 'Fontisto'; // Removed duplicated AntDesign from here
};

// getIcon dùng để thay đổi các icon của menu nếu khác thư viện (fontawesome, ant-design, etc.)
const getIcon = (icon: IconType) => {
switch (icon.library) {
case 'AntDesign':
return <AntDesign name={icon.name} size={20} color="#fff" />;
case 'Ionicons':
return <Ionicons name={icon.name} size={20} color="#fff" />;
case 'SimpleLineIcons':
return <SimpleLineIcons name={icon.name} size={20} color="#fff" />;
case 'Feather':
return <Feather name={icon.name} size={20} color="#fff" />;
case 'MaterialCommunityIcons':
return <MaterialCommunityIcons name={icon.name} size={20} color="#fff" />;
case 'Foundation':
return <Foundation name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
case 'Fontisto':
return <Fontisto name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
default:
return <Ionicons name={icon.name} size={20} color="#fff" />;
}
};

// Khuyến mãi
const propotionData = [
{
id: 0,
title: 'Genius',
icon: {},
description:
'Lê ơi, bạn dang là Genius Cấp 1 trong chương trình khách hàng thân thiết của chúng tôi',
},
{
id: 1,
title: 'Giảm giá 10% cho chỗ nghỉ',
name: 'Ưu đãi',
icon: {name: 'percent', library: 'Feather'},
description: 'Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu',
},
{
id: 2,
title: 'Giảm giá 10% khi thuê xe',
icon: {
name: 'car',
library: 'AntDesign',
},
description: 'Tiết kiệm cho một số xe cho thuê',
},
{
id: 3,
title: 'Giảm giá 15% cho chỗ nghỉ',
icon: {
name: 'calendar',
library: 'Feather',
},
description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
},
{
id: 4,
title: 'Nâng hạng phòng miễn phí',
icon: {
name: 'calendar',
library: 'Feather',
},
description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
},
];

// Dữ liệu menu
const menuData = [
{
id: 1,
title: 'Lưu trú',
icon: {
name: 'home-outline',
library: 'Ionicons',
},
},
{
id: 2,
title: 'Chuyến bay',
icon: {
name: 'plane',
library: 'SimpleLineIcons',
},
},
{
id: 3,
title: 'Thuê xe',
icon: {
name: 'car',
library: 'AntDesign',
},
},
{
id: 4,
title: 'Taxi',
icon: {
name: 'taxi',
library: 'MaterialCommunityIcons',
},
},
{
id: 5,
title: 'Địa điểm tham quan',
icon: {
name: 'map',
library: 'Foundation',
},
},
];

// lấy độ rộng màn hình
const {width} = Dimensions.get('window');

const products = Array.from({length: 10}).map((\_, index) => ({
id: index + 1,
name: `Sản phẩm ${index + 1}`,
price: `VNĐ ${((index + 1) * 100000).toLocaleString()}`,
image: 'https://via.placeholder.com/150',
}));
const renderItem = ({item}: any) => (
<TouchableOpacity
style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      paddingHorizontal: 12,
      justifyContent: 'center',
      borderWidth: 0.7,
      borderColor: '#fff',
      minHeight: 50,
      backgroundColor: 'rgba(255,255,255,0.2)',
      gap: 8,
    }}>
{getIcon(item.icon)}
<Text
style={{
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
      }}>
{item.title}
</Text>
</TouchableOpacity>
);

const HomeScreen = ({navigation}: {navigation: any}) => {
const route = useRoute();
const {currentLocation}: any = route?.params || {};
const [isOpenBottomsheet, setIsOpenBottomsheet] = useState(false);
const [upcomingBookings, setUpcomingBookings] = useState<any>([]);
const {token, user} = useAuthStore();
// ref
const bottomSheetRef = useRef<BottomSheetModal>(null);

// callbacks
const handleSheetChanges = useCallback((index: number) => {
console.log('handleSheetChanges', index);
}, []);

const handleOpenBottomsheet = () => {
// setIsOpenBottomsheet(true);
bottomSheetRef.current?.present();
};

// React.useEffect(() => {
// const unsubscribe = navigation.addListener('blur', () => {
// // Khi screen mất focus (blur), đóng BottomSheet
// setIsOpenBottomsheet(false);
// bottomSheetRef.current?.dismiss();
// });

// return unsubscribe; // Cleanup listener khi unmount
// }, [navigation]);

const renderBackdrop = (props: any) => (
<BottomSheetBackdrop
{...props}
appearsOnIndex={0} // Backdrop xuất hiện khi Bottom Sheet ở snap point đầu tiên
disappearsOnIndex={-1} // Backdrop biến mất khi Bottom Sheet đóng
opacity={0.7} // Độ trong suốt của backdrop (0 - trong suốt, 1 - hoàn toàn mờ)
pressBehavior="none"
/>
);
// console.log('currentLocation', currentLocation);

const getUpcomingBookings = async () => {
try {
const response = await axios.get(`${API_URL}/booking/upcoming`, {
headers: {
Authorization: `Bearer ${token}`,
},
});
setUpcomingBookings(response?.data?.result);
} catch (error) {
console.log('error', error);
}
};
useEffect(() => {
if (token) {
getUpcomingBookings();
}
}, [token]);
return (
<>
<View
style={{
          backgroundColor: '#fff',
          flex: 1,
        }}>
<FlatList
horizontal
showsHorizontalScrollIndicator={false}
data={menuData}
renderItem={renderItem}
keyExtractor={item => item.id.toString()}
contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 5,
            backgroundColor: '#003b95',
            paddingBottom: 15,
          }}
/>
<ScrollView
contentContainerStyle={{gap: 16}}
showsVerticalScrollIndicator={false}>
{/_ Tìm kiếm _/}
<SearchComponent location={currentLocation} />
{/_ <View
style={{
            padding: 16,
          }}>
<View
style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
<AntDesign name="search1" size={24} color="#000" />
<Text
style={{
                paddingVertical: 14,
                color: '#000',
              }}>
Th6, 17 thg 1 - CN, 19 thg11
</Text>
</View>
<View
style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
<AntDesign name="calendar" size={24} color="#000" />
<Text
style={{
                paddingVertical: 14,
                color: '#000',
              }}>
Th6, 17 thg 1 - CN, 19 thg11
</Text>
</View>
<View
style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
<AntDesign name="user" size={24} color="#000" />
<Text
style={{
                paddingVertical: 14,
                color: '#000',
              }}>
1 phòng - <Text>2 người lớn</Text> - <Text>0 trẻ em</Text>
</Text>
</View>
<TouchableOpacity
style={{
              backgroundColor: '#0165FF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}
onPress={openModal}>
<Text
style={{
                paddingVertical: 14,
                color: '#FFF',
                fontWeight: '500',
              }}>
Tìm
</Text>
</TouchableOpacity>
</View> _/}

          {/* Tiếp tục tìm kiếm của bạn */}
          <View
            style={
              {
                // paddingHorizontal: 16,
                // gap: 16,
              }
            }>
            {/* Chuyến đi hiện tại */}
            {upcomingBookings?.length > 0 && (
              <View
                style={{
                  marginHorizontal: 16,
                  gap: 20,
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Chuyến đi hiện tại{' '}
                  <Text
                    style={{
                      color: COLORS.red,
                      fontSize: 13,
                      fontStyle: 'italic',
                    }}>
                    ({upcomingBookings?.length} chuyến đi)
                  </Text>
                </Text>
                <Pressable
                  style={({pressed}) => {
                    return {
                      backgroundColor: pressed
                        ? COLORS.grayLight
                        : COLORS.white,
                      padding: 16,
                      borderRadius: 10,
                      borderColor: COLORS.black,
                      shadowColor: COLORS.black,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 3.2,
                      shadowRadius: 3.84,
                      elevation: 5,
                      gap: 10,
                    };
                  }}
                  onPress={() =>
                    navigation.navigate('ReservationDetail', {
                      infoBooking: upcomingBookings[0],
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}>
                    <View style={{flexDirection: 'column', gap: 10}}>
                      <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                        {upcomingBookings[0]?.Hotel?.name}
                      </Text>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Text style={{color: COLORS.black}}>
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkin_date,
                          )}{' '}
                          -{' '}
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkout_date,
                          )}
                        </Text>
                        <Text style={{color: COLORS.green}}>Đã xác nhận</Text>
                      </View>
                    </View>
                    <Image
                      source={{
                        uri: `${API_URL}/hotel-properties/hotel/get-image/${
                          upcomingBookings[0]?.Hotel?.id
                        }/${upcomingBookings[0]?.Hotel?.images?.split(',')[0]}`,
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 25,
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="dot-single" size={24} color={COLORS.black} />
                    <Text style={{color: COLORS.black}}>
                      Nhận phòng từ {upcomingBookings[0]?.Hotel?.checkinto}
                    </Text>
                  </View>

                  <Pressable
                    style={({pressed}) => {
                      return {
                        backgroundColor: pressed
                          ? COLORS.grayLight
                          : COLORS.white,
                        padding: 8,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: COLORS.grayDark,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        alignSelf: 'flex-start',
                      };
                    }}
                    onPress={handleOpenBottomsheet}>
                    <Ionicons
                      name="chatbubbles-outline"
                      color={COLORS.black}
                      size={20}
                    />
                    <Text style={{color: COLORS.black}}>Liên hệ chỗ nghỉ</Text>
                  </Pressable>
                </Pressable>
              </View>
            )}
            {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={propotionData}
            contentContainerStyle={{
              gap: 16,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  width: width * 0.8,
                  borderRadius: 8,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {width: 10, height: 6},
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  backgroundColor: '#fff',
                  padding: 16,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Image
                  source={{
                    uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                  }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 4,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '500',
                    }}>
                    Paris
                  </Text>
                  <Text>25 - 26 thg 1, 2 người lớn</Text>
                </View>
              </TouchableOpacity>
            )}
            snapToInterval={width * 0.8 + 16}
            snapToAlignment="start"
            decelerationRate="fast"
          /> */}
          </View>

          {/* Khuyến mãi */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 16,
              }}>
              Đi nhiều hơn, trả ít hơn
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 16,
              }}
              snapToInterval={width * 0.5 + 10}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    padding: 14,
                    borderWidth: index === 0 ? 0 : 1,
                    borderColor:
                      index === 0
                        ? '#003b95'
                        : index === 1 || index === 2
                        ? '#0156ff'
                        : 'rgba(224, 224, 224, 0.9)',
                    borderRadius: 8,
                    marginBottom: 16,
                    backgroundColor:
                      index === 0
                        ? '#003b95'
                        : index === 1 || index === 2
                        ? '#fff'
                        : 'rgba(224, 224, 224, 0.5)',
                    gap: 10,
                    width: width * 0.5,
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: index === 0 ? '#fff' : '#000',
                      fontSize: index === 0 ? 18 : 14,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: index === 0 ? '#fff' : '#000',
                      fontSize: index === 0 ? 14 : 12,
                    }}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Tiếp tục tìm kiếm của bạn */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Tiếp tục tìm kiếm của bạn
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: width * 0.8,
                    borderRadius: 8,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    backgroundColor: '#fff',
                    padding: 16,
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Image
                    source={{
                      uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 4,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '500',
                      }}>
                      Paris
                    </Text>
                    <Text>25 - 26 thg 1, 2 người lớn</Text>
                  </View>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.8 + 16}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>

          {/* Ưu đãi cho cuối tuần  */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Chỗ nghỉ ở TP. Hồ Chí Minh
              </Text>
              <Text style={{color: '#000'}}>
                Đề xuất dựa trên tìm kiếm gần đây của bạn
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => console.log('Pressed')}
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.55,
                    borderRadius: 8,
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                  }}>
                  <Image
                    source={{
                      uri: 'https://www.huonggianghotel.com.vn/wp-content/uploads/2018/06/DSC_4211-HDR2_1600x1068-1.jpg',
                    }}
                    style={{
                      width: '100%',
                      height: width * 0.5,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      padding: 10,
                      gap: 3,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 15,
                        lineHeight: 22,
                      }}
                      numberOfLines={2}>
                      KT MERAKI BOUTIQUE - Bui vien walking street
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#003b95',
                          padding: 4,
                          borderRadius: 4,
                          borderBottomLeftRadius: 0,
                          alignSelf: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 12,
                          }}>
                          7.1
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#000',
                        }}>
                        Tốt - 100 đánh giá
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <EvilIcons name="location" size={20} color="#000" />
                      <Text
                        style={{
                          color: '#000',
                        }}>
                        TP.Hồ Chí Minh
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#008234',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#fff',
                        }}>
                        Ưu Đãi Đầu Năm 2025
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '600',
                          textAlign: 'right',
                        }}>
                        Giá cho 2 đêm, 2 người lớn
                      </Text>
                      <Text
                        style={{
                          color: '#f20000',
                          textDecorationLine: 'line-through',
                          textAlign: 'right',
                        }}>
                        VNĐ 3.000.000
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 20,
                          textAlign: 'right',
                        }}>
                        VNĐ 1.350.000
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: 'right',
                        }}>
                        Đã bao gồm thuế và phí
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={14}
                          color="#008234"
                        />
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#008234',
                            fontSize: 13,
                          }}>
                          Hủy miễn phí
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={14}
                          color="#008234"
                        />
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#008234',
                            fontSize: 13,
                          }}>
                          Không cần thanh toán trước
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.55 + 12}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>

          {/* Du khách cũng đã đặt */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Du khách cũng đã đặt
              </Text>
              <Text style={{color: '#000', lineHeight: 22}}>
                Thêm gợi ý cho chuyến đi của bạn trong khoảng thời gian ngày 17
                tháng 1 - ngày 19 tháng 1
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: width * 0.55,
                    height: width * 0.7,
                    borderRadius: 8,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  }}>
                  <Image
                    source={{
                      uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 8,
                    }}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}>
                    TP. Hồ Chí Minh
                  </Text>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.55 + 12}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>
        </ScrollView>
      </View>
      <BottomSheetModal
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={[200]}
        enableDynamicSizing={false}
        handleIndicatorStyle={{
          backgroundColor: COLORS.grayLight,
          width: 40,
        }}
        enableContentPanningGesture={false}
        overDragResistanceFactor={0}
        // enableHandlePanningGesture={false} // Tắt kéo handle
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            paddingHorizontal: 18,
            backgroundColor: COLORS.white,
            flex: 1,
            paddingVertical: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18, fontWeight: 'bold'}}>
            Liên hệ chỗ nghỉ
          </Text>
          <View style={{marginTop: 10}}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}
              onPress={() => {}}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                Nhắn tin cho chỗ nghỉ
              </Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                +84 {upcomingBookings[0]?.Hotel?.User?.phonenumber}
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>

);
};

export default HomeScreen;

import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
View,
Text,
Pressable,
TouchableOpacity,
StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalComponent from './ModalComponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {formatDate} from '@utils/constants';
import axios from 'axios';
import {API_URL} from '../utils/constants';
import {
BottomSheetBackdrop,
BottomSheetModal,
BottomSheetView,
} from '@gorhom/bottom-sheet';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

const COLORS = {
primary: '#FFB700',
secondary: '#0165FF',
white: '#FFFFFF',
black: '#000000',
gray: '#808080',
};

type location = {
address?: string;
latitude?: string;
longitude?: string;
};

type SearchComponentProps = {
location?: location;
};

type initialSearchCondition = {
checkInDate?: string;
checkOutDate?: string;
location?: location;
capacity?: {
adults?: number;
children?: number;
};
rooms: number;
};

// Format ngày hiện tại theo chuẩn YYYY-MM-DD
const getCurrentDateFormatted = (): string => {
return new Date().toLocaleDateString('en-CA').split('/').join('-');
};

// Lấy ngày mặc định cho checkout (ngày sau checkIn)
const getDefaultCheckOutDate = (checkInDateStr: string): string => {
const checkIn = new Date(checkInDateStr);
checkIn.setDate(checkIn.getDate() + 1);
return checkIn.toLocaleDateString('en-CA').split('/').join('-');
};

const SearchComponent = React.memo(({location}: SearchComponentProps) => {
const navigation = useNavigation<NativeStackNavigationProp<any>>();
const [modalVisible, setModalVisible] = useState(false);
const [modalMessage, setModalMessage] = useState('');
const bottomSheetRef = useRef<BottomSheetModal>(null);
const initialDate = getCurrentDateFormatted();

// State để lưu trữ searchCondition
const [searchCondition, setSearchCondition] =
useState<initialSearchCondition>({
checkInDate: initialDate,
checkOutDate: getDefaultCheckOutDate(initialDate),
location: location,
capacity: {
adults: 2,
children: 0,
},
rooms: 1,
});

console.log('searchCondition', searchCondition);
// State để lưu trữ dateRange
const [dateRange, setDateRange] = useState<{
startDate: string | null;
endDate: string | null;
}>({
startDate: initialDate,
endDate: getDefaultCheckOutDate(initialDate),
});

// Snap points cho BottomSheetModal
const snapPoints = useMemo(() => ['60%'], []);

// Mở và đóng modal
const openModal = useCallback((message: string) => {
setModalMessage(message);
setModalVisible(true);
}, []);

const closeModal = useCallback(() => {
setModalVisible(false);
}, []);

// Mở BottomSheetModal
const openCalendar = useCallback(() => {
console.log('Opening calendar BottomSheetModal');
if (bottomSheetRef.current) {
bottomSheetRef.current.present();
} else {
console.error('bottomSheetRef is not initialized');
}
}, []);

// Đóng BottomSheetModal
const closeCalendar = useCallback(() => {
bottomSheetRef.current?.dismiss();
}, []);

// Render backdrop cho BottomSheetModal
const renderBackdrop = useCallback(
(props: any) => (
<BottomSheetBackdrop
{...props}
appearsOnIndex={0}
disappearsOnIndex={-1}
opacity={0.7}
pressBehavior="close"
/>
),
[],
);

// Xử lý chọn ngày giống AdjustBookingDateScreen
const handleDayPress = useCallback((day: any) => {
const selectedDate = day.dateString;

    // Kiểm tra ngày trong quá khứ
    if (moment(selectedDate).isBefore(moment().startOf('day'))) {
      return;
    }

    setDateRange(prev => {
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        // Chọn ngày bắt đầu mới
        const newDateRange = {startDate: selectedDate, endDate: null};
        // Cập nhật searchCondition ngay lập tức
        setSearchCondition(prevCondition => ({
          ...prevCondition,
          checkInDate: selectedDate,
          checkOutDate: undefined, // Xóa checkOutDate vì chưa chọn
        }));
        return newDateRange;
      } else {
        // Đã có startDate, đang chọn endDate
        if (moment(selectedDate).isAfter(prev.startDate)) {
          const newDateRange = {...prev, endDate: selectedDate};
          // Cập nhật searchCondition ngay lập tức
          setSearchCondition(prevCondition => ({
            ...prevCondition,
            checkOutDate: selectedDate,
          }));
          return newDateRange;
        } else {
          // Nếu chọn ngày trước startDate, đặt lại startDate
          const newDateRange = {startDate: selectedDate, endDate: null};
          // Cập nhật searchCondition ngay lập tức
          setSearchCondition(prevCondition => ({
            ...prevCondition,
            checkInDate: selectedDate,
            checkOutDate: undefined,
          }));
          return newDateRange;
        }
      }
    });

}, []);

// Xác nhận ngày (chỉ đóng modal)
const handleConfirmDate = useCallback(() => {
if (dateRange.startDate && !dateRange.endDate) {
openModal('Vui lòng chọn ngày trả phòng');
} else {
closeCalendar();
}
}, [dateRange, closeCalendar, openModal]);

// Tối ưu markedDates với useMemo
const markedDates = useMemo(() => {
const result: any = {};
const {startDate, endDate} = dateRange;

    // Vô hiệu hóa các ngày trong quá khứ
    const startDisableDate = moment().subtract(6, 'months');
    const endDisableDate = moment().subtract(1, 'day');
    let currentDisableDate = startDisableDate.clone();

    while (currentDisableDate.isSameOrBefore(endDisableDate)) {
      const dateStr = currentDisableDate.format('YYYY-MM-DD');
      result[dateStr] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: {backgroundColor: '#f0f0f0'},
          text: {color: '#c0c0c0', textDecorationLine: 'line-through'},
        },
      };
      currentDisableDate.add(1, 'day');
    }

    // Đánh dấu ngày bắt đầu
    if (startDate) {
      result[startDate] = {
        ...result[startDate],
        selected: true,
        startingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: COLORS.secondary,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            borderTopRightRadius: endDate === startDate ? 6 : 0,
            borderBottomRightRadius: endDate === startDate ? 6 : 0,
            width: '100%',
          },
          text: {color: COLORS.white},
        },
      };
    }

    // Đánh dấu ngày kết thúc
    if (endDate && endDate !== startDate) {
      result[endDate] = {
        ...result[endDate],
        selected: true,
        endingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: COLORS.secondary,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: '100%',
          },
          text: {color: COLORS.white},
        },
      };
    }

    // Đánh dấu các ngày giữa
    if (startDate && endDate && startDate !== endDate) {
      let curDate = moment(startDate).clone();
      while (curDate.add(1, 'day').isBefore(moment(endDate))) {
        const dateStr = curDate.format('YYYY-MM-DD');
        result[dateStr] = {
          ...result[dateStr],
          selected: true,
          disabled: false,
          disableTouchEvent: false,
          customStyles: {
            container: {
              backgroundColor: '#cccccc',
              borderRadius: 0,
              width: '100%',
            },
            text: {color: COLORS.black},
          },
        };
      }
    }

    return result;

}, [dateRange.startDate, dateRange.endDate]);

// Điều hướng tới màn hình chọn địa điểm
const handleLocation = useCallback(() => {
navigation.replace('SearchLocation', {
location,
});
}, [navigation, location]);

// Xử lý tìm kiếm khách sạn
const handleSearch = useCallback(async () => {
try {
if (searchCondition?.location?.address) {
if (!searchCondition.checkOutDate) {
openModal('Vui lòng chọn ngày trả phòng');
return;
}
navigation.navigate('HotelSearchResults', {
searchCondition,
});
} else {
openModal('Vui lòng nhập điểm đến của bạn');
}
} catch (error) {
console.log('error', error);
}
}, [navigation, openModal, searchCondition]);

return (
<View style={styles.container}>
<View style={styles.searchCard}>
{/_ Địa điểm _/}
<Pressable
style={({pressed}) => [
styles.inputRow,
pressed && styles.pressedInput,
]}
onPress={handleLocation}
android_ripple={{color: '#e0e0e0'}}>
<AntDesign name="search1" size={24} color={COLORS.black} />
{searchCondition?.location?.address ? (
<Text
              style={styles.inputText}
              numberOfLines={1}
              ellipsizeMode="tail">
{searchCondition.location.address}
</Text>
) : (
<Text style={styles.inputTextPlaceholder}>
Nhập điểm đến của bạn
</Text>
)}
</Pressable>

        {/* Ngày nhận phòng và trả phòng */}
        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedInput,
          ]}
          onPress={openCalendar}
          android_ripple={{color: '#e0e0e0'}}>
          <AntDesign name="calendar" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            {searchCondition?.checkInDate && searchCondition?.checkOutDate ? (
              formatDate(searchCondition.checkInDate, true) +
              ' - ' +
              formatDate(searchCondition.checkOutDate, true)
            ) : (
              <Text style={styles.inputTextPlaceholder}>
                Chọn ngày nhận và trả phòng
              </Text>
            )}
          </Text>
        </Pressable>

        {/* Số lượng khách */}
        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedInput,
          ]}
          android_ripple={{color: '#e0e0e0'}}>
          <AntDesign name="user" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            1 phòng - <Text>{searchCondition.capacity?.adults} người lớn</Text>{' '}
            - <Text>{searchCondition.capacity?.children} trẻ em</Text>
          </Text>
        </Pressable>

        {/* Nút tìm kiếm */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          activeOpacity={0.7}>
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      <ModalComponent modalVisible={modalVisible} closeModal={closeModal}>
        <Text style={styles.modalText}>{modalMessage}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </ModalComponent>

      {/* BottomSheetModal lịch */}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        android_keyboardInputMode="adjustResize">
        <BottomSheetView style={styles.calendarContainer}>
          <View style={styles.weekdayHeader}>
            <Text>Th2</Text>
            <Text>Th3</Text>
            <Text>Th4</Text>
            <Text>Th5</Text>
            <Text>Th6</Text>
            <Text>Th7</Text>
            <Text>CN</Text>
          </View>
          <View style={styles.calendarWrapper}>
            <CalendarList
              pastScrollRange={0}
              futureScrollRange={12}
              showScrollIndicator={false}
              horizontal={false}
              calendarHeight={200}
              hideDayNames
              initialNumToRender={3}
              markingType="custom"
              windowSize={3}
              removeClippedSubviews={true}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={moment().format('YYYY-MM-DD')}
              theme={{
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmDate}
              activeOpacity={0.7}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>

);
});

const styles = StyleSheet.create({
container: {
padding: 16,
},
searchCard: {
backgroundColor: COLORS.primary,
gap: 5,
borderRadius: 8,
padding: 5,
shadowColor: COLORS.black,
shadowOffset: {width: 0, height: 2},
shadowOpacity: 0.1,
shadowRadius: 2,
elevation: 3,
},
inputRow: {
backgroundColor: COLORS.white,
flexDirection: 'row',
alignItems: 'center',
paddingHorizontal: 16,
paddingVertical: 12,
borderRadius: 2,
gap: 10,
},
pressedInput: {
backgroundColor: '#f5f5f5',
},
inputText: {
color: COLORS.black,
flex: 1,
},
inputTextPlaceholder: {
color: COLORS.gray,
flex: 1,
},
dateTextContainer: {
flex: 1,
gap: 4,
},
dateLabel: {
color: COLORS.black,
fontWeight: 'bold',
fontSize: 14,
},
dateValue: {
color: COLORS.secondary,
fontWeight: 'bold',
fontSize: 16,
},
divider: {
height: 1,
backgroundColor: '#ccc',
marginHorizontal: 16,
},
searchButton: {
backgroundColor: COLORS.secondary,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
paddingHorizontal: 16,
borderRadius: 2,
},
searchButtonText: {
paddingVertical: 14,
color: COLORS.white,
fontWeight: '500',
},
modalText: {
color: COLORS.black,
fontSize: 16,
marginBottom: 16,
},
modalButton: {
alignSelf: 'flex-end',
paddingHorizontal: 5,
},
modalButtonText: {
color: '#0165FC',
fontWeight: '500',
fontSize: 16,
textAlign: 'right',
},
bottomSheetIndicator: {
width: '13%',
backgroundColor: '#797979',
},
weekdayHeader: {
paddingHorizontal: 32,
paddingVertical: 16,
flexDirection: 'row',
justifyContent: 'space-between',
borderBottomWidth: 1,
borderColor: '#ccc',
},
calendarContainer: {
flex: 1,
},
calendarWrapper: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
bottomButtonContainer: {
backgroundColor: COLORS.white,
padding: 16,
shadowColor: '#000',
shadowOffset: {width: 0, height: -4},
shadowOpacity: 0.1,
shadowRadius: 2,
elevation: 5,
},
confirmButton: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
padding: 12,
backgroundColor: COLORS.secondary,
width: '100%',
gap: 10,
borderRadius: 3,
},
confirmButtonText: {
color: COLORS.white,
fontSize: 16,
fontWeight: '500',
},
});

export default SearchComponent;

// import React, {useState, useCallback, useRef, memo} from 'react';
// import {View, StyleSheet} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
// import moment from 'moment';
// import 'moment/locale/vi';

// import SearchLocationInput from './SearchLocationInput';
// import DateRangeInput from './DateRangeInput';
// import GuestInput from './GuestInput';
// import SearchButton from './SearchButton';
// import AlertModal from './AlertModal';
// import CalendarBottomSheet from './CalendarBottomSheet';

// import {
// getCurrentDateFormatted,
// getDefaultCheckOutDate,
// } from '../utils/constants';
// import {Location, SearchCondition, DateRange} from '../types/commonTypes';
// import {COLORS} from '../styles/colors';

// moment.locale('vi');

// type SearchComponentProps = {
// location?: Location;
// };

// const SearchComponent = memo(({location}: SearchComponentProps) => {
// const navigation = useNavigation<NativeStackNavigationProp<any>>();
// const bottomSheetRef = useRef<BottomSheetModal>(null);
// const initialDate = getCurrentDateFormatted();

// // Alert Modal state
// const [alertModal, setAlertModal] = useState({
// visible: false,
// message: '',
// });

// // SearchCondition state
// const [searchCondition, setSearchCondition] = useState<SearchCondition>({
// checkInDate: initialDate,
// checkOutDate: getDefaultCheckOutDate(initialDate),
// location: location,
// capacity: {
// adults: 2,
// children: 0,
// },
// rooms: 1,
// });

// // DateRange state
// const [dateRange, setDateRange] = useState<DateRange>({
// startDate: initialDate,
// endDate: getDefaultCheckOutDate(initialDate),
// });

// // Alert Modal handlers
// const openAlert = useCallback((message: string) => {
// setAlertModal({visible: true, message});
// }, []);

// const closeAlert = useCallback(() => {
// setAlertModal(prev => ({...prev, visible: false}));
// }, []);

// // Calendar Modal handlers
// const openCalendar = useCallback(() => {
// bottomSheetRef.current?.present();
// }, []);

// const closeCalendar = useCallback(() => {
// bottomSheetRef.current?.dismiss();
// }, []);

// // Handlers
// const handleLocation = useCallback(() => {
// navigation.replace('SearchLocation', {location});
// }, [navigation, location]);

// const handleDayPress = useCallback((day: any) => {
// const selectedDate = day.dateString;

// // Kiểm tra ngày trong quá khứ
// if (moment(selectedDate).isBefore(moment().startOf('day'))) {
// return;
// }

// setDateRange(prev => {
// if (!prev.startDate || (prev.startDate && prev.endDate)) {
// // Chọn ngày bắt đầu mới
// setSearchCondition(prevCondition => ({
// ...prevCondition,
// checkInDate: selectedDate,
// checkOutDate: undefined,
// }));
// return {startDate: selectedDate, endDate: null};
// } else {
// // Đã có startDate, đang chọn endDate
// if (moment(selectedDate).isAfter(prev.startDate)) {
// setSearchCondition(prevCondition => ({
// ...prevCondition,
// checkOutDate: selectedDate,
// }));
// return {...prev, endDate: selectedDate};
// } else {
// setSearchCondition(prevCondition => ({
// ...prevCondition,
// checkInDate: selectedDate,
// checkOutDate: undefined,
// }));
// return {startDate: selectedDate, endDate: null};
// }
// }
// });
// }, []);

// const handleConfirmDate = useCallback(() => {
// if (dateRange.startDate && !dateRange.endDate) {
// openAlert('Vui lòng chọn ngày trả phòng');
// } else {
// closeCalendar();
// }
// }, [dateRange, closeCalendar, openAlert]);

// const handleSearch = useCallback(() => {
// if (searchCondition?.location?.address) {
// if (!searchCondition.checkOutDate) {
// openAlert('Vui lòng chọn ngày trả phòng');
// return;
// }
// navigation.navigate('HotelSearchResults', {
// searchCondition,
// });
// } else {
// openAlert('Vui lòng nhập điểm đến của bạn');
// }
// }, [navigation, openAlert, searchCondition]);

// return (
// <View style={styles.container}>
// <View style={styles.searchCard}>
// {/_ Địa điểm _/}
// <SearchLocationInput
// address={searchCondition?.location?.address}
// onPress={handleLocation}
// />

// {/_ Ngày nhận phòng và trả phòng _/}
// <DateRangeInput
// checkInDate={searchCondition?.checkInDate}
// checkOutDate={searchCondition?.checkOutDate}
// onPress={openCalendar}
// />

// {/_ Số lượng khách _/}
// <GuestInput
// adults={searchCondition.capacity?.adults}
// children={searchCondition.capacity?.children}
// rooms={searchCondition.rooms}
// onPress={() => {}} // To be implemented for guest selection
// />

// {/_ Nút tìm kiếm _/}
// <SearchButton onPress={handleSearch} />
// </View>

// {/_ Alert Modal _/}
// <AlertModal
// visible={alertModal.visible}
// message={alertModal.message}
// onClose={closeAlert}
// />

// {/_ Calendar BottomSheet _/}
// <CalendarBottomSheet
// bottomSheetRef={bottomSheetRef}
// dateRange={dateRange}
// onDayPress={handleDayPress}
// onConfirm={handleConfirmDate}
// />
// </View>
// );
// });

// // Shared styles
// const styles = StyleSheet.create({
// container: {
// padding: 16,
// },
// searchCard: {
// backgroundColor: COLORS.yellowGold,
// gap: 5,
// borderRadius: 8,
// padding: 5,
// shadowColor: COLORS.black,
// shadowOffset: {width: 0, height: 2},
// shadowOpacity: 0.1,
// shadowRadius: 2,
// elevation: 3,
// },
// inputRow: {
// backgroundColor: COLORS.white,
// flexDirection: 'row',
// alignItems: 'center',
// paddingHorizontal: 16,
// paddingVertical: 12,
// borderRadius: 2,
// gap: 10,
// },
// pressedInput: {
// backgroundColor: '#f5f5f5',
// },
// inputText: {
// color: COLORS.black,
// flex: 1,
// },
// inputTextPlaceholder: {
// color: COLORS.gray,
// flex: 1,
// },
// searchButton: {
// backgroundColor: COLORS.primary,
// flexDirection: 'row',
// alignItems: 'center',
// justifyContent: 'center',
// paddingHorizontal: 16,
// borderRadius: 2,
// },
// searchButtonText: {
// paddingVertical: 14,
// color: COLORS.white,
// fontWeight: '500',
// },
// modalText: {
// color: COLORS.black,
// fontSize: 16,
// marginBottom: 16,
// },
// modalButton: {
// alignSelf: 'flex-end',
// paddingHorizontal: 5,
// },
// modalButtonText: {
// color: '#0165FC',
// fontWeight: '500',
// fontSize: 16,
// textAlign: 'right',
// },
// bottomSheetIndicator: {
// width: '13%',
// backgroundColor: '#797979',
// },
// weekdayHeader: {
// paddingHorizontal: 32,
// paddingVertical: 16,
// flexDirection: 'row',
// justifyContent: 'space-between',
// borderBottomWidth: 1,
// borderColor: '#ccc',
// },
// calendarContainer: {
// flex: 1,
// },
// calendarWrapper: {
// flex: 1,
// justifyContent: 'center',
// alignItems: 'center',
// },
// bottomButtonContainer: {
// backgroundColor: COLORS.white,
// padding: 16,
// shadowColor: '#000',
// shadowOffset: {width: 0, height: -4},
// shadowOpacity: 0.1,
// shadowRadius: 2,
// elevation: 5,
// },
// confirmButton: {
// flexDirection: 'row',
// alignItems: 'center',
// justifyContent: 'center',
// padding: 12,
// backgroundColor: COLORS.primary,
// width: '100%',
// gap: 10,
// borderRadius: 3,
// },
// confirmButtonText: {
// color: COLORS.white,
// fontSize: 16,
// fontWeight: '500',
// },
// });

// export default SearchComponent;

<!-- Trước khi thêm lịch sử tìm kiếm -->

import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';

import {
FlatList,
ScrollView,
Text,
TouchableOpacity,
View,
TextInput,
Image,
Dimensions,
StyleSheet,
Pressable,
Modal,
TouchableWithoutFeedback,
Linking,
Alert,
} from 'react-native';
// import {Icon} from 'react-native-vector-icons/Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import ModalComponent from '@components/ModalComponent';
import SearchComponent from '@components/SearchComponent';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
BottomSheetBackdrop,
BottomSheetModal,
BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import {
API_URL,
formatDate,
getCurrentDateFormatted,
getDefaultCheckOutDate,
} from '@utils/constants';
import useAuthStore from '@stores/authStore';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';

// Tạo kiểu dữ liệu cho icon để đảm bảo nó có cấu trúc đúng
type IconType = {
name: string;
library:
| 'AntDesign'
| 'Ionicons'
| 'SimpleLineIcons'
| 'Feather'
| 'MaterialCommunityIcons'
| 'Foundation'
| 'Fontisto'; // Removed duplicated AntDesign from here
};

// getIcon dùng để thay đổi các icon của menu nếu khác thư viện (fontawesome, ant-design, etc.)
const getIcon = (icon: IconType) => {
switch (icon.library) {
case 'AntDesign':
return <AntDesign name={icon.name} size={20} color="#fff" />;
case 'Ionicons':
return <Ionicons name={icon.name} size={20} color="#fff" />;
case 'SimpleLineIcons':
return <SimpleLineIcons name={icon.name} size={20} color="#fff" />;
case 'Feather':
return <Feather name={icon.name} size={20} color="#fff" />;
case 'MaterialCommunityIcons':
return <MaterialCommunityIcons name={icon.name} size={20} color="#fff" />;
case 'Foundation':
return <Foundation name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
case 'Fontisto':
return <Fontisto name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
default:
return <Ionicons name={icon.name} size={20} color="#fff" />;
}
};

// Khuyến mãi
const propotionData = [
{
id: 0,
title: 'Genius',
icon: {},
description:
'Lê ơi, bạn dang là Genius Cấp 1 trong chương trình khách hàng thân thiết của chúng tôi',
},
{
id: 1,
title: 'Giảm giá 10% cho chỗ nghỉ',
name: 'Ưu đãi',
icon: {name: 'percent', library: 'Feather'},
description: 'Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu',
},
{
id: 2,
title: 'Giảm giá 10% khi thuê xe',
icon: {
name: 'car',
library: 'AntDesign',
},
description: 'Tiết kiệm cho một số xe cho thuê',
},
{
id: 3,
title: 'Giảm giá 15% cho chỗ nghỉ',
icon: {
name: 'calendar',
library: 'Feather',
},
description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
},
{
id: 4,
title: 'Nâng hạng phòng miễn phí',
icon: {
name: 'calendar',
library: 'Feather',
},
description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
},
];

// Dữ liệu menu
const menuData = [
{
id: 1,
title: 'Lưu trú',
icon: {
name: 'home-outline',
library: 'Ionicons',
},
},
{
id: 2,
title: 'Chuyến bay',
icon: {
name: 'plane',
library: 'SimpleLineIcons',
},
},
{
id: 3,
title: 'Thuê xe',
icon: {
name: 'car',
library: 'AntDesign',
},
},
{
id: 4,
title: 'Taxi',
icon: {
name: 'taxi',
library: 'MaterialCommunityIcons',
},
},
{
id: 5,
title: 'Địa điểm tham quan',
icon: {
name: 'map',
library: 'Foundation',
},
},
];

// lấy độ rộng màn hình
const {width} = Dimensions.get('window');

const products = Array.from({length: 10}).map((\_, index) => ({
id: index + 1,
name: `Sản phẩm ${index + 1}`,
price: `VNĐ ${((index + 1) * 100000).toLocaleString()}`,
image: 'https://via.placeholder.com/150',
}));
const renderItem = ({item}: any) => (
<TouchableOpacity
style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      paddingHorizontal: 12,
      justifyContent: 'center',
      borderWidth: 0.7,
      borderColor: '#fff',
      minHeight: 50,
      backgroundColor: 'rgba(255,255,255,0.2)',
      gap: 8,
    }}>
{getIcon(item.icon)}
<Text
style={{
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
      }}>
{item.title}
</Text>
</TouchableOpacity>
);

const HomeScreen = ({navigation}: {navigation: any}) => {
const route = useRoute();
const {currentLocation}: any = route?.params || {};
const [isOpenBottomsheet, setIsOpenBottomsheet] = useState(false);
const [upcomingBookings, setUpcomingBookings] = useState<any>([]);
const {token, user} = useAuthStore();

// ref for contact bottomsheet
const bottomSheetRef = useRef<BottomSheetModal>(null);

// ref for calendar bottomsheet - new
const calendarBottomSheetRef = useRef<BottomSheet>(null);

// State for date selection
const [dateRange, setDateRange] = useState({
startDate: getCurrentDateFormatted(),
endDate: getDefaultCheckOutDate(getCurrentDateFormatted()),
});

// callbacks
const handleSheetChanges = useCallback((index: number) => {
console.log('handleSheetChanges', index);
}, []);

const handleOpenBottomsheet = () => {
bottomSheetRef.current?.present();
};

// New function to open calendar
const handleOpenCalendar = useCallback(() => {
if (calendarBottomSheetRef.current) {
calendarBottomSheetRef.current.expand();
}
}, []);

const renderBackdrop = (props: any) => (
<BottomSheetBackdrop
{...props}
appearsOnIndex={0}
disappearsOnIndex={-1}
opacity={0.7}
pressBehavior="close"
/>
);

// Handle day selection for calendar
const handleDayPress = useCallback((day: any) => {
const selectedDate = day.dateString;

    // Skip selection if date is in the past
    if (moment(selectedDate).isBefore(moment().startOf('day'))) {
      return;
    }

    setDateRange(prev => {
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        return {
          startDate: selectedDate,
          endDate: null,
        };
      } else {
        if (moment(selectedDate).isAfter(prev.startDate)) {
          return {
            ...prev,
            endDate: selectedDate,
          };
        } else {
          return {
            startDate: selectedDate,
            endDate: null,
          };
        }
      }
    });

}, []);

// Calculate marked dates for calendar
const markedDates = useMemo(() => {
const result: any = {};
const {startDate, endDate} = dateRange;

    // Disable past dates
    const startDisableDate = moment().subtract(6, 'months');
    const endDisableDate = moment().subtract(1, 'day');
    let currentDisableDate = startDisableDate.clone();

    while (currentDisableDate.isSameOrBefore(endDisableDate)) {
      const dateStr = currentDisableDate.format('YYYY-MM-DD');
      result[dateStr] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: {backgroundColor: '#f0f0f0'},
          text: {color: '#c0c0c0', textDecorationLine: 'line-through'},
        },
      };
      currentDisableDate.add(1, 'day');
    }

    // Mark start date
    if (startDate) {
      result[startDate] = {
        ...result[startDate],
        selected: true,
        startingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: '#0165FC',
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            borderTopRightRadius: endDate === startDate ? 6 : 0,
            borderBottomRightRadius: endDate === startDate ? 6 : 0,
            width: '100%',
          },
          text: {color: 'white'},
        },
      };
    }

    // Mark end date
    if (endDate) {
      result[endDate] = {
        ...result[endDate],
        selected: true,
        endingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: '#0165FC',
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: '100%',
          },
          text: {color: 'white'},
        },
      };
    }

    // Mark in-between dates
    if (startDate && endDate) {
      let curDate = moment(startDate).clone();
      while (curDate.add(1, 'day').isBefore(moment(endDate))) {
        const dateStr = curDate.format('YYYY-MM-DD');
        result[dateStr] = {
          ...result[dateStr],
          selected: true,
          disabled: false,
          disableTouchEvent: false,
          customStyles: {
            container: {
              backgroundColor: '#cccccc',
              borderRadius: 0,
              width: '100%',
            },
            text: {color: 'black'},
          },
        };
      }
    }

    return result;

}, [dateRange.startDate, dateRange.endDate]);

// Handle confirming date selection
const handleConfirmDate = useCallback(() => {
if (dateRange.startDate && !dateRange.endDate) {
Alert.alert('Thông báo', 'Vui lòng chọn ngày trả phòng');
} else if (dateRange.startDate && dateRange.endDate) {
// Đóng calendar BottomSheet
calendarBottomSheetRef.current?.close();

      // Không cần cập nhật SearchCondition ở đây vì
      // nó sẽ được cập nhật tự động qua useEffect trong SearchComponent
    }

}, [dateRange]);

const getUpcomingBookings = async () => {
try {
const response = await axios.get(`${API_URL}/booking/upcoming`, {
headers: {
Authorization: `Bearer ${token}`,
},
});
setUpcomingBookings(response?.data?.result);
} catch (error) {
console.log('error', error);
}
};
useEffect(() => {
if (token) {
getUpcomingBookings();
}
}, [token]);
return (
<>
<View
style={{
          backgroundColor: '#fff',
          flex: 1,
        }}>
<FlatList
horizontal
showsHorizontalScrollIndicator={false}
data={menuData}
renderItem={renderItem}
keyExtractor={item => item.id.toString()}
contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 5,
            backgroundColor: '#003b95',
            paddingBottom: 15,
          }}
/>
<ScrollView
contentContainerStyle={{gap: 16}}
showsVerticalScrollIndicator={false}>
{/_ Tìm kiếm - Pass openCalendar function _/}
<SearchComponent
            location={currentLocation}
            openCalendar={handleOpenCalendar}
            dateRange={dateRange}
          />

          {/* Tiếp tục tìm kiếm của bạn */}
          <View
            style={
              {
                // paddingHorizontal: 16,
                // gap: 16,
              }
            }>
            {/* Chuyến đi hiện tại */}
            {upcomingBookings?.length > 0 && (
              <View
                style={{
                  marginHorizontal: 16,
                  gap: 20,
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Chuyến đi hiện tại{' '}
                  <Text
                    style={{
                      color: COLORS.red,
                      fontSize: 13,
                      fontStyle: 'italic',
                    }}>
                    ({upcomingBookings?.length} chuyến đi)
                  </Text>
                </Text>
                <Pressable
                  style={({pressed}) => {
                    return {
                      backgroundColor: pressed
                        ? COLORS.grayLight
                        : COLORS.white,
                      padding: 16,
                      borderRadius: 10,
                      borderColor: COLORS.black,
                      shadowColor: COLORS.black,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 3.2,
                      shadowRadius: 3.84,
                      elevation: 5,
                      gap: 10,
                    };
                  }}
                  onPress={() =>
                    navigation.navigate('ReservationDetail', {
                      infoBooking: upcomingBookings[0],
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}>
                    <View style={{flexDirection: 'column', gap: 10}}>
                      <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                        {upcomingBookings[0]?.Hotel?.name}
                      </Text>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Text style={{color: COLORS.black}}>
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkin_date,
                          )}{' '}
                          -{' '}
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkout_date,
                          )}
                        </Text>
                        <Text style={{color: COLORS.green}}>Đã xác nhận</Text>
                      </View>
                    </View>
                    <Image
                      source={{
                        uri: `${API_URL}/hotel-properties/hotel/get-image/${
                          upcomingBookings[0]?.Hotel?.id
                        }/${upcomingBookings[0]?.Hotel?.images?.split(',')[0]}`,
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 25,
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="dot-single" size={24} color={COLORS.black} />
                    <Text style={{color: COLORS.black}}>
                      Nhận phòng từ {upcomingBookings[0]?.Hotel?.checkinto}
                    </Text>
                  </View>

                  <Pressable
                    style={({pressed}) => {
                      return {
                        backgroundColor: pressed
                          ? COLORS.grayLight
                          : COLORS.white,
                        padding: 8,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: COLORS.grayDark,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        alignSelf: 'flex-start',
                      };
                    }}
                    onPress={handleOpenBottomsheet}>
                    <Ionicons
                      name="chatbubbles-outline"
                      color={COLORS.black}
                      size={20}
                    />
                    <Text style={{color: COLORS.black}}>Liên hệ chỗ nghỉ</Text>
                  </Pressable>
                </Pressable>
              </View>
            )}
          </View>

          {/* Khuyến mãi */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 16,
              }}>
              Đi nhiều hơn, trả ít hơn
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 16,
              }}
              snapToInterval={width * 0.5 + 10}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    padding: 14,
                    borderWidth: index === 0 ? 0 : 1,
                    borderColor:
                      index === 0
                        ? '#003b95'
                        : index === 1 || index === 2
                        ? '#0156ff'
                        : 'rgba(224, 224, 224, 0.9)',
                    borderRadius: 8,
                    marginBottom: 16,
                    backgroundColor:
                      index === 0
                        ? '#003b95'
                        : index === 1 || index === 2
                        ? '#fff'
                        : 'rgba(224, 224, 224, 0.5)',
                    gap: 10,
                    width: width * 0.5,
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: index === 0 ? '#fff' : '#000',
                      fontSize: index === 0 ? 18 : 14,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: index === 0 ? '#fff' : '#000',
                      fontSize: index === 0 ? 14 : 12,
                    }}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Tiếp tục tìm kiếm của bạn */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Tiếp tục tìm kiếm của bạn
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: width * 0.8,
                    borderRadius: 8,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    backgroundColor: '#fff',
                    padding: 16,
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Image
                    source={{
                      uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 4,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '500',
                      }}>
                      Paris
                    </Text>
                    <Text>25 - 26 thg 1, 2 người lớn</Text>
                  </View>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.8 + 16}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>

          {/* Ưu đãi cho cuối tuần  */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Chỗ nghỉ ở TP. Hồ Chí Minh
              </Text>
              <Text style={{color: '#000'}}>
                Đề xuất dựa trên tìm kiếm gần đây của bạn
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => console.log('Pressed')}
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.55,
                    borderRadius: 8,
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                  }}>
                  <Image
                    source={{
                      uri: 'https://www.huonggianghotel.com.vn/wp-content/uploads/2018/06/DSC_4211-HDR2_1600x1068-1.jpg',
                    }}
                    style={{
                      width: '100%',
                      height: width * 0.5,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      padding: 10,
                      gap: 3,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 15,
                        lineHeight: 22,
                      }}
                      numberOfLines={2}>
                      KT MERAKI BOUTIQUE - Bui vien walking street
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#003b95',
                          padding: 4,
                          borderRadius: 4,
                          borderBottomLeftRadius: 0,
                          alignSelf: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 12,
                          }}>
                          7.1
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#000',
                        }}>
                        Tốt - 100 đánh giá
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <EvilIcons name="location" size={20} color="#000" />
                      <Text
                        style={{
                          color: '#000',
                        }}>
                        TP.Hồ Chí Minh
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#008234',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#fff',
                        }}>
                        Ưu Đãi Đầu Năm 2025
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '600',
                          textAlign: 'right',
                        }}>
                        Giá cho 2 đêm, 2 người lớn
                      </Text>
                      <Text
                        style={{
                          color: '#f20000',
                          textDecorationLine: 'line-through',
                          textAlign: 'right',
                        }}>
                        VNĐ 3.000.000
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 20,
                          textAlign: 'right',
                        }}>
                        VNĐ 1.350.000
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: 'right',
                        }}>
                        Đã bao gồm thuế và phí
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={14}
                          color="#008234"
                        />
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#008234',
                            fontSize: 13,
                          }}>
                          Hủy miễn phí
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={14}
                          color="#008234"
                        />
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#008234',
                            fontSize: 13,
                          }}>
                          Không cần thanh toán trước
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.55 + 12}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>

          {/* Du khách cũng đã đặt */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Du khách cũng đã đặt
              </Text>
              <Text style={{color: '#000', lineHeight: 22}}>
                Thêm gợi ý cho chuyến đi của bạn trong khoảng thời gian ngày 17
                tháng 1 - ngày 19 tháng 1
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: width * 0.55,
                    height: width * 0.7,
                    borderRadius: 8,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  }}>
                  <Image
                    source={{
                      uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 8,
                    }}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}>
                    TP. Hồ Chí Minh
                  </Text>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.55 + 12}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>
        </ScrollView>
      </View>

      {/* Contact BottomSheet - existing */}
      <BottomSheetModal
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={[200]}
        enableDynamicSizing={false}
        handleIndicatorStyle={{
          backgroundColor: COLORS.grayLight,
          width: 40,
        }}
        enableContentPanningGesture={false}
        overDragResistanceFactor={0}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            paddingHorizontal: 18,
            backgroundColor: COLORS.white,
            flex: 1,
            paddingVertical: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18, fontWeight: 'bold'}}>
            Liên hệ chỗ nghỉ
          </Text>
          <View style={{marginTop: 10}}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}
              onPress={() => {}}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                Nhắn tin cho chỗ nghỉ
              </Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                +84 {upcomingBookings[0]?.Hotel?.User?.phonenumber}
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      {/* Calendar BottomSheet - new */}
      <BottomSheet
        ref={calendarBottomSheetRef}
        snapPoints={['60%']}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        enableOverDrag={false}
        onChange={handleSheetChanges}
        index={-1}
        handleIndicatorStyle={{width: '13%', backgroundColor: '#797979'}}>
        <View
          style={{
            paddingHorizontal: 32,
            paddingVertical: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text>CN</Text>
          <Text>Th2</Text>
          <Text>Th3</Text>
          <Text>Th4</Text>
          <Text>Th5</Text>
          <Text>Th6</Text>
          <Text>Th7</Text>
        </View>
        <BottomSheetView style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CalendarList
              pastScrollRange={0}
              futureScrollRange={12}
              showScrollIndicator={false}
              horizontal={false}
              calendarHeight={200}
              hideDayNames
              initialNumToRender={3}
              markingType="custom"
              windowSize={3}
              removeClippedSubviews={true}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={moment().format('YYYY-MM-DD')}
              theme={{
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: -4},
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                backgroundColor: '#0165FF',
                width: '100%',
                gap: 10,
                borderRadius: 3,
              }}
              onPress={handleConfirmDate}
              activeOpacity={0.7}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>

);
};

export default HomeScreen;
