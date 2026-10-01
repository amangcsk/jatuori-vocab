# 단어 원본 데이터

- `data/{middle,high,toefl}_NN.txt` : 한 줄 = `난이도|단어|발음|뜻(;로 구분, 품사 뒤 공백)|예문1|해석1|예문2|해석2` (예문의 `*…*` 는 굵게 표시)
  - 파일 이름 순서 = 단어 id 순서(`middle-001`…). 기존 단어의 순서를 바꾸거나 중간에 끼워 넣으면 사용자의 완료 기록이 어긋나므로, **새 단어는 항상 맨 뒤에 추가**하세요.
- `validate.js` : 형식·표제어 포함 여부 검사 (`node validate.js`, `source` 폴더에서 실행)
- `build.js` : 난이도를 3등분해 `../words-*.js` 를 생성 (`node build.js`)
- 단어를 고친 뒤에는 `build.js` 실행 → `sw.js` 의 `VERSION` 올리기 → 커밋·푸시

- 참고: validate.js 가 보고하는 'headword?' 항목 22건은 blew·caught·fell 같은 불규칙 변화형이라 정상입니다.
