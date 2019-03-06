import Mock from 'mockjs';
import { param2Obj } from '@/utils';

const NameList: any[] = [];
const count = 100;

for (let i = 0; i < count; i++) {
  NameList.push(Mock.mock({
    name: '@first',
  }));
}
NameList.push({ name: 'mockPan' });

export default {
  searchUser: (config: {url: string}) => {
    const { name } = param2Obj(config.url) as any;
    const mockNameList = NameList.filter(item => {
      const lowerCaseName = item.name.toLowerCase();
      if (name && lowerCaseName.indexOf(name.toLowerCase()) < 0) return false;
      return true;
    });
    return { items: mockNameList };
  },
};
