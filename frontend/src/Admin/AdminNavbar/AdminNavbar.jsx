import { Avatar, Box, Image, Text, Wrap, WrapItem } from "@chakra-ui/react"
import './AdminNavbar.css'

export const AdminNavbar = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null


    return (
        <div>
            <Box w={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'10px'} pl={'15px'} pr={'15px'} mt={'0'} gap={'10px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
                <Box display={'flex'} alignItems={'end'}>
                    <Image onClick={()=>console.log('click')} cursor={'pointer'} w={'30px'} h={'30px'} src={'https://cdn-icons-png.flaticon.com/128/1828/1828859.png'}/>
                    <Text fontSize={'16px'} ml={'10px'} color={'blue.400'}>Hi,Admin</Text>
                </Box>
                <Box display={'flex'} gap={'10px'}>
                <img width={'30px'} height={'30px'} src="https://cdn-icons-png.flaticon.com/128/646/646094.png" alt="" />
                <Wrap>
                    <WrapItem>
                        <Avatar color={'black'} bg='#00aeff' size={['sm']} name={portalData && portalData.username.match(/\b\w/g).join('').toUpperCase()} src={portalData && portalData.avatar} />
                    </WrapItem>
                </Wrap>
            </Box>
                </Box>
        </div>
    )
}