const Popup = (props) => {
  return props.trigger ? (
    <div className="fixed bg-transparent flex justify-center items-center w-full h-screen">
      <div className="relative bg-white">
        <button onClick={() => props.setTrigger(false)}>close</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
