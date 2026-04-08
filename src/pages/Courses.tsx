import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, Filter } from 'lucide-react';
import { cn } from '../utils/cn';

const LEVELS = ['全部', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const COURSES = [
  { id: '1', title: '日常问候与自我介绍', level: 'A1', duration: '45 分钟', tags: ['生活', '基础'], progress: 100, image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400' },
  { id: '2', title: '在餐厅点餐', level: 'A2', duration: '1 小时', tags: ['生活', '实战'], progress: 60, image: 'https://images.unsplash.com/photo-1414235077428-33898ed2e8c5?auto=format&fit=crop&q=80&w=400' },
  { id: '3', title: '主持季度汇报会议', level: 'B1', duration: '2 小时', tags: ['职场', '表达'], progress: 0, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400' },
  { id: '4', title: '商务谈判技巧', level: 'B2', duration: '3 小时', tags: ['职场', '进阶'], progress: 0, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=400' },
  { id: '5', title: '深度学术讨论', level: 'C1', duration: '4 小时', tags: ['学术', '复杂'], progress: 0, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400' },
  { id: '6', title: '文化差异与隐喻', level: 'C2', duration: '5 小时', tags: ['文化', '高级'], progress: 0, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400' },
];

export default function Courses() {
  const [activeLevel, setActiveLevel] = useState('全部');
  const navigate = useNavigate();

  const filteredCourses = COURSES.filter(
    (c) => activeLevel === '全部' || c.level === activeLevel
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">分级课程中心</h1>
          <p className="text-slate-500 mt-2">从基础到精通，循序渐进掌握语言</p>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          <Filter className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={cn(
                'px-5 py-2.5 rounded-full font-medium transition-all shrink-0',
                activeLevel === level
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full">
                  {course.level}
                </span>
                {course.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                {course.title}
              </h3>
              
              <div className="flex items-center text-slate-500 text-sm mb-6 mt-auto">
                <Clock className="w-4 h-4 mr-1.5" />
                {course.duration}
                <span className="mx-3 text-slate-300">•</span>
                <BookOpen className="w-4 h-4 mr-1.5" />
                12 个模块
              </div>

              <div className="space-y-4">
                {course.progress > 0 ? (
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">学习进度</span>
                      <span className="font-bold text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ) : null}

                <button
                  onClick={() => navigate(`/learn/${course.id}`)}
                  className={cn(
                    'w-full py-3.5 rounded-xl font-bold flex items-center justify-center transition-all',
                    course.progress === 100
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      : 'bg-slate-900 text-white hover:bg-blue-600'
                  )}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {course.progress === 100 ? '再次练习' : course.progress > 0 ? '继续学习' : '开始学习'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
