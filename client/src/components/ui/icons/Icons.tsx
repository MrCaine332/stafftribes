import React from 'react';

export type IconNames = 'close' | 'eye' | 'arrow-down-simple'| 'plus' | 'minus'
	| 'comment' | 'lightning' | 'message' | 'delete'

interface IIcons {
	name?: IconNames
	size?: number | string
	color?: string
}

const Icons = ({ name, size = 24, color }: IIcons) => {
	switch (name) {
		case "close":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill={color}/>
				</svg>
			)
		case "eye":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M12.0006 20C17.0271 20 20.4745 16.8417 22.3428 14.494C23.5187 13.0163 23.5187 10.9837 22.3428 9.506C20.4745 7.15826 17.0271 4 12.0006 4C6.97402 4 3.52661 7.15826 1.65833 9.506C0.482379 10.9837 0.482378 13.0163 1.65833 14.494C3.52661 16.8417 6.97402 20 12.0006 20ZM12.0005 16C14.2097 16 16.0005 14.2091 16.0005 12C16.0005 9.79086 14.2097 8 12.0005 8C9.7914 8 8.00054 9.79086 8.00054 12C8.00054 14.2091 9.7914 16 12.0005 16Z" fill={color}/>
					<path fillRule="evenodd" clipRule="evenodd" d="M10.0018 11.9153C10.0006 11.9434 10 11.9716 10 12C10 12.5072 10.1888 12.9703 10.5 13.3229C10.7284 13.5817 11.0228 13.781 11.3569 13.8943C11.5587 13.9628 11.775 14 12 14C13.1046 14 14 13.1046 14 12C14 11.775 13.9628 11.5587 13.8943 11.3569C13.781 11.0228 13.5817 10.7284 13.3229 10.5C12.9703 10.1888 12.5072 10 12 10C11.9716 10 11.9434 10.0006 11.9153 10.0018C11.9701 10.1577 12 10.3253 12 10.5C12 10.6308 11.9833 10.7577 11.9518 10.8786C11.8155 11.4028 11.4028 11.8155 10.8786 11.9518C10.7577 11.9833 10.6308 12 10.5 12C10.3253 12 10.1577 11.9701 10.0018 11.9153Z" fill={color}/>
				</svg>
			)
		case "arrow-down-simple":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M16.2071 9.79289C15.8166 9.40237 15.1834 9.40237 14.7929 9.79289L12 12.5858L9.20711 9.79289C8.81658 9.40237 8.18342 9.40237 7.79289 9.79289C7.40237 10.1834 7.40237 10.8166 7.79289 11.2071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.2071 11.2071C16.5976 10.8166 16.5976 10.1834 16.2071 9.79289Z" fill={color} />
				</svg>
			)
		case "plus":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z" fill={color}/>
				</svg>
			)
		case "minus":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z" fill={color}/>
				</svg>
			)
		case "comment":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M7 15.9013V18.9951L12.0622 16.0038L12.5913 15.9951C14.6952 15.9607 16.5886 15.7488 18.0044 15.5334C18.8979 15.3975 19.5187 14.7739 19.6536 13.9909C19.8406 12.9049 20 11.5289 20 10C20 8.47108 19.8406 7.09512 19.6536 6.00907C19.5187 5.22608 18.8979 4.60252 18.0044 4.46657C16.4559 4.23096 14.3383 4 12 4C9.66167 4 7.54408 4.23096 5.99562 4.46657C5.10214 4.60252 4.4813 5.22608 4.34643 6.00907C4.15936 7.09512 4 8.47108 4 10C4 11.5289 4.15936 12.9049 4.34643 13.9909C4.46355 14.6709 4.93854 15.2158 5.63108 15.4461L7 15.9013ZM2.37546 5.66957C2.66565 3.98488 4.00472 2.74648 5.69477 2.48932C7.31411 2.24293 9.53559 2 12 2C14.4644 2 16.6859 2.24293 18.3052 2.48932C19.9953 2.74648 21.3344 3.98488 21.6245 5.66957C21.8268 6.84372 22 8.33525 22 10C22 11.6647 21.8268 13.1563 21.6245 14.3304C21.3344 16.0151 19.9953 17.2535 18.3052 17.5107C16.8238 17.7361 14.8384 17.9586 12.6241 17.9949L6.50873 21.6085C5.84211 22.0024 5 21.5219 5 20.7476V17.344C3.64656 16.8939 2.62456 15.7766 2.37546 14.3304C2.17321 13.1563 2 11.6647 2 10C2 8.33525 2.17321 6.84372 2.37546 5.66957Z" fill={color}/>
					<path fillRule="evenodd" clipRule="evenodd" d="M7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H7ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11H7Z" fill={color}/>
				</svg>
			)
		case "lightning":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M12.361 13.0001L11.3761 18.9097L17.0886 11.0001H11.6392L12.6241 5.09045L6.91163 13.0001H12.361ZM15.2985 1.20966C15.4723 0.167021 14.1203 -0.397134 13.5015 0.45977L4.1452 13.4146C3.66757 14.0759 4.14011 15.0001 4.95588 15.0001H10.0001L8.70172 22.7905C8.52795 23.8331 9.87992 24.3973 10.4988 23.5404L19.855 10.5856C20.3327 9.92423 19.8601 9.00007 19.0444 9.00007H14.0001L15.2985 1.20966Z" fill={color}/>
					</svg>
			)
		case "message":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5ZM4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4Z" fill={color}/>
					<path fillRule="evenodd" clipRule="evenodd" d="M5.2318 7.35984C5.58537 6.93556 6.21593 6.87824 6.64021 7.2318L11.3598 11.1648C11.7307 11.4739 12.2694 11.4739 12.6402 11.1648L17.3598 7.2318C17.7841 6.87824 18.4147 6.93556 18.7682 7.35984C19.1218 7.78412 19.0645 8.41468 18.6402 8.76825L13.9206 12.7013C12.808 13.6284 11.192 13.6284 10.0795 12.7013L5.35984 8.76825C4.93556 8.41468 4.87824 7.78412 5.2318 7.35984Z" fill={color}/>
				</svg>
			)
		case "delete":
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M12.361 13.0001L11.3761 18.9097L17.0886 11.0001H11.6392L12.6241 5.09045L6.91163 13.0001H12.361ZM15.2985 1.20966C15.4723 0.167021 14.1203 -0.397134 13.5015 0.45977L4.1452 13.4146C3.66757 14.0759 4.14011 15.0001 4.95588 15.0001H10.0001L8.70172 22.7905C8.52795 23.8331 9.87992 24.3973 10.4988 23.5404L19.855 10.5856C20.3327 9.92423 19.8601 9.00007 19.0444 9.00007H14.0001L15.2985 1.20966Z" fill={color}/>
				</svg>
			)

		default:
			return null
	}
}

export default Icons;