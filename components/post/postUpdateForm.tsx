export function postUpdateForm({
  editedPost,
  handleUpdatePost,
  setEditedPost,
  setIsEditingPost,
}) {
  return (
    <div>
      {/* <input
        type="text"
        value={editedPost.title}
        onChange={(e) =>
          setEditedPost({ ...editedPost, title: e.target.value })
        }
      /> */}
      <textarea
        value={editedPost.content}
        className="textarea textarea-bordered textarea-primary"
        onChange={(e) =>
          setEditedPost({ ...editedPost, content: e.target.value })
        }
      />
      <button onClick={handleUpdatePost}>수정 완료</button>
      <button onClick={() => setIsEditingPost(false)}>취소</button>
    </div>
  );
}
