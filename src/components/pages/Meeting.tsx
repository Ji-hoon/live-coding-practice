export default function Meeting() {
  return (
    <>
      <h3>일정 설정</h3>
      <hr className="m-4" />
      <div className="flex gap-4">
        <label>시작 시간</label>
        <input type="date" />
        <input type="time" />
      </div>
      <div className="m-2"></div>
      <div className="flex gap-4">
        <label>종료 시간</label>
        <input type="date" />
        <input type="time" />
      </div>
    </>
  );
}
