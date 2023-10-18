## Đổi cổng tcp theo cổng server local
adb reverse tcp:8000 tcp:8000

## Start the Metro Server
npm start

## Start your Application
npm run android
yarn android