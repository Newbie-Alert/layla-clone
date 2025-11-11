### 프로젝트 정보

- 스토어의 복덕빵 앱 기능 MVP 개발

### **기간**

2025.10 — 2025.11

### **역할**

Fullstack (Frontend & Backend)

### 핵심 기능

- 지도에 구/동 단위 매물 그룹화, 마커 표시
- 매물 상세 조회
- 실시간 채팅

### 기술 (Frontend / Backend)

- Frontend: `Typescript` , `Expo RN` , `socket.io-client` , `axios` , `mongoose`
- Backend: `Node js` , `Express` , `socket.io`
- DB: `MongoDB`

---

## 🎯 프로젝트 개요

부동산 플랫폼 **복덕빵**의 주요 기능을 MVP 수준으로 구현한 클론 프로젝트.

실제 서비스 환경을 가정하여 **지도 기반 매물 조회**와 **실시간 채팅 기능**을 중심으로 설계함.

---

## 주요 기능 설명

### 지도 기반 매물 그룹화 및 조회

- 지도 줌 레벨에 따라 **시/구/동 단위로 매물 데이터를 동적으로 그룹화 하여 표기**
- **React Native Maps**를 이용해 행정구역 단위별 마커 클러스터링 구현
- 마커 클릭 시 **Bottom Sheet UI**로 해당 지역의 매물 리스트 표시
- 매물 클릭 시 **매물 상세 페이지로 이동**, 세부 정보 확인 가능

### 실시간 채팅

- 매물 상세 페이지에서 “채팅하기” 클릭 시,
  매물 등록자(uploader)와 구매 희망자(buyer)가 동일한 `roomId` 기반으로 연결
- **Socket.IO**를 이용한 양방향 실시간 메시지 송수신
- **MongoDB + Express 서버**에서 채팅방(Room)과 메시지(Message) 데이터를 저장 및 관리
- 중복 방 생성 방지를 위해 **findOneAndUpdate(upsert)** 방식으로 원자적 방 생성 처리

---

# 기능 시연

## 지도에서 매물 조회

**시나리오**

- 지도 줌 레벨에 따라 구/동 단위로 매물 클러스터 표시
- 특정 마커 클릭 시 해당 지역 매물 리스트 출력
- 리스트에서 매물 선택 시 상세 페이지로 이동

![Screen_Recording_20251110_203155_clone (1).gif](<attachment:b7058d66-f0db-4939-86fa-514fb116cac2:Screen_Recording_20251110_203155_clone_(1).gif>)

## 실시간 채팅

**시나리오**

1.  매물 상세 페이지 → “채팅하기” 클릭
    매물등록 유저와(우) 매물에 관심이 있는 유저(좌)의 채팅이 연결됨
        [KakaoTalk_20251111_131710526.mp4](attachment:195867ec-449d-4333-bd5e-41ec9f1f1722:KakaoTalk_20251111_131710526.mp4)
2.  socket io 기반 실시간 채팅 진행
    메세지와 채팅방은 DB에 저장됨.

## Github Repo

### 프로젝트 일정

[제목 없음](https://www.notion.so/2a4ebfb9298280d882ebcb66cc891de8?pvs=21)
