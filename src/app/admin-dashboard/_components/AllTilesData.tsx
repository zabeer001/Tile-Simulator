// export type AllTilesDataType = {
//     id: number;
//     image: string;
//     title: string;
//     description : string;
//     category: string;
//     added: string;
//     gridSelection : string
// };

// export const AllTilesData: AllTilesDataType[] = [
//     {
//         id: 1,
//         image:"/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 2,
//         image: "/assets/tile2.png",
//         title: "Penny",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 3,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 4,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 5,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 6,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 7,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 8,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 9,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     },
//     {
//         id: 10,
//         image: "/assets/tile1.png",
//         title: "Shay",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
//         category: "Pattern Collection",
//         added: "21 Sep, 2020",
//         gridSelection : "1x1",
//     }
// ];


export type ApiResponseTiles = {
    success: boolean;
    message: string;
    data: {
      data: {
        current_page: number;
        data: Tile[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLink[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
      };
      current_page: number;
      total_pages: number;
      per_page: number;
      total: number;
    };
  };
  
  export type Tile = {
    id: number;
    name: string;
    description: string | null;
    grid_category: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    categories: Category[];
  };
  
  export type Category = {
    id: number;
    name: string;
    description: string | null;
    created_at: string | null;
    updated_at: string;
    pivot: {
      tile_id: number;
      category_id: number;
      created_at: string;
      updated_at: string;
    };
  };
  
  export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
  };
  
