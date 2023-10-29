import { useEffect, useState } from "react";

export default function Orders() {
    return (
        <div>
            <body class="bg-black min-h-screen">
                <div class="navbar bg-slate-400 text-white">
                    <div class="flex-1 justify-center">
                        <a class="normal-case text-3xl">Orders</a>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center">
                    <div class="card ju w-full m-5 bg-neutral text-neutral-content">
                        <div class="card-body ">
                            <h2 class="card-title">Quantity: 30</h2>
                            <h2 class="card-title">Price: 7.43</h2>
                            <p class="text-xs">Date: 7/8/22</p>
                            <div class="card-actions justify-evenly">
                                <div class="btn bg-green-600">BUY</div>
                                <button class="btn btn-primary">Modify</button>
                                <button class="btn btn-ghost">Cancel</button>
                            </div>
                        </div>
                    </div>

                    <div class="card ju w-full m-5 bg-neutral text-neutral-content">
                        <div class="card-body ">
                            <h2 class="card-title">Quantity: 30</h2>
                            <h2 class="card-title">Price: 7.43</h2>
                            <p class="text-xs">Date: 7/8/22</p>
                            <div class="card-actions justify-evenly">
                                <div class="btn bg-red-600">BUY</div>
                                <button class="btn btn-primary">Modify</button>
                                <button class="btn btn-ghost">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}