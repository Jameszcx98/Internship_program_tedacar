import i18n from '../i18n';

const state = {
		
		wxProfile:{
			// nickName: i18n.t('index').nickName,
			
		},
		lang:'',
		hotItems:[],
		openId: '',
	    screenResults:[],//筛选结果
		// Conversation id
		convoId: {},
		choose2:[],//筛选条件
		rang:[],//滑动条件
		allCondition:[],//所以筛选条件
		currentPage:1,
		pageSize:5,
		oldlist:[],
		allPage:null,
		isScreen:false
		
	}

export default state