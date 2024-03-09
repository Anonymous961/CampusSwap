const Footer = () => {
  return (
    <div className="bg-slate-800 bottom-0 w-full px-10 py-5 poppins-regular">
      <div className="flex flex-row justify-between my-4">
        <img
          src="https://i.postimg.cc/BvXyZQcc/campus-Swaplogo.png"
          width={"100px"}
          height={"100px"}
          alt=""
        />
        <div>
          <h3 className="text-stone-200 font-bold my-2">Our mission</h3>
          <ul>
            <li className="text-stone-300">About</li>
            <li className="text-stone-300">FAQ</li>
            <li className="text-stone-300">Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="text-stone-200 font-bold my-2">Legal</h3>
          <ul>
            <li className="text-stone-300">Privacy Policy</li>
            <li className="text-stone-300">Terms and Conditions</li>
            <li className="text-stone-300">Cookie Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="text-stone-200 font-bold my-2">Help</h3>
          <ul>
            <li className="text-stone-300">Shipping and Delivery</li>
            <li className="text-stone-300">Return Policy</li>
            <li className="text-stone-300">Security and Payment</li>
          </ul>
        </div>
        <div>
          <h3 className="text-stone-200 font-bold my-2">Connect</h3>
          <ul></ul>
        </div>
      </div>
      <p className="text-center text-gray-500">
        Copyright © Campus Swap 2024
      </p>
    </div>
  );
};

export default Footer;
