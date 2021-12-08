export const koreanDictionary = {
  message: {
    hello: '세계야 반가워!'
  },
  commons: {
    Actions: {
      search: '검색',
      create: '생성',
      update: '수정',
      delete: '삭제',
      cancel: '취소',
      setToManager: '매니저로 설정',
      filter: '검색조건',
    },
    Results: {
      Messages: {
        saved: '저장에 성공했습니다.',
        created: '신규 생성에 성공했습니다.',
        updated: '업데이트에 성공했습니다.',
        deleted: '삭제에 성공했습니다.',
        setToManager: '매니저 설정에 성공했습니다.',
        failRedirect: '페이지 이동에 실패했습니다.'
      },
      Titles: {
        success: '성공',
        fail: '실패',
        failRedirect: '페이지 이동 실패',
      }
    },
  },
  router: {
    Home: 'Home',
    ModuleManager: '매니저',
    BaseManager: '매니저 목록',
    FormManager: '매니저 입력',
    ModuleSchedule: '스케쥴',
    BaseSchedule: '스케쥴 목록',
    FormSchedule: '스케쥴 입력',
  },
  Types: {
    Models: {
      Manager: {
        Entity: '매니저',
        id: 'Key',
        name: '이름',
        img: '이미지',
        circleImg: '원형 이미지',
        randClickMessages: '클릭 메시지',
        morningMessages: '아침 인사 메시지',
        lunchMessages: '점심 인사 메시지',
        eveningsMessages: '저녁 인사 메시지',
        nightMessages: '새벽 인사 메시지',
        scheduleMessage: '스케쥴 메시지',
        happyBirthdayMessage: '생일 축하 메시지',
        displayStyle: '보이는 방식',
        Titles: {
          managerImages: '매니저 이미지 목록',
          currentManager: '현재 매니저',
          managerList: '매니저 목록'
        },
        Actions: {
          openManager: '매니저 열기',
          closeManager: '매니저 닫기',
        }
      },
      Schedule: {
        id: 'Key',
        title: '제목',
        date: '시간',
        content: '내용',
        Actions: {
          clearDoneList: '완료목록 지우기'
        },
        States: {
          saved: '저장',
          done: '완료'
        }
      },
      Extras: {
        fullManager: '전체 모드',
        circleManager: '원형 모드',
      }
    },
    Systems: {}
  }
}
