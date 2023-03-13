export type Character = {
	id: string;
	name: string;
	side: 'DARK' | 'LIGHT';
	force: {
		power: string;
		midichlorian: number | null;
	};
	createdTimestamp: number;
	description: string;
};

/**
 *{
      "id": "vader",
      "name": "Darth<br>Vader",
      "side": "DARK",
      "force": {
        "power": "Erő használata",
        "midichlorian": 21000
      },
      "createdTimestamp": 1576208817,
      "description": "Vader az egyik legmarkánsabb, legikonikusabb és legkarizmatikusabb gonosztevő, hatalmas (bár még emberléptékű) termetével, sötét sisakjával, félelmetes akusztikájú, jellegzetes lélegzetvételével és hangképzésével."
    }, 
 */
