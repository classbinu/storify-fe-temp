"use client";

export function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-20">
      <nav className="grid grid-flow-col gap-4">
        <a
          href="https://github.com/classbinu"
          target="_blank"
          className="link link-hover"
        >
          Developer
        </a>
        <a
          href="https://github.com/classbinu/storify-fe"
          target="_blank"
          className="link link-hover"
        >
          FE Repo
        </a>
        <a
          href="https://github.com/classbinu/storify-be"
          target="_blank"
          className="link link-hover"
        >
          BE Repo
        </a>
        <span
          className="link link-hover"
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_1"
            ) as HTMLDialogElement;
            if (modal) modal.showModal();
          }}
        >
          Contact
        </span>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by Classbinu</p>
      </aside>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">classbinu@gmail.com</h3>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </footer>
  );
}
